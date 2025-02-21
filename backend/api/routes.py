from fastapi import APIRouter, HTTPException, Depends
from models.user import UserCreate, UserLogin
from services.auth import authenticate_user, create_access_token, create_user

router = APIRouter()

@router.post('/register')
async def register(user: UserCreate):
    return await create_user(user)

@router.post('/login')
async def login(user: UserLogin):
    user_data = await authenticate_user(user.username, user.password)
    if not user_data:
        raise HTTPException(status_code=401, detail="Invalid Creds")
    access_token = create_access_token({"sub": user.username})
    return {"access_token": access_token}