from fastapi import HTTPException
from passlib.context import CryptContext
from jose import JWTError, jwt
import os
from datetime import datetime, timedelta
from backend.app.db.config import ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM, SECRET_KEY, db

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

async def authenticate_user(username: str, password: str):
    user = await db.users.find_one({"username": username})
    if user and pwd_context.verify(password, user["password"]):  # ✅ Fixed recursive call
        return user
    return None

async def create_user(user):
    user_exist = await db.users.find_one({"username": user.username})
    if user_exist:
        raise HTTPException(status_code=400, detail="Username Already Exists")
    
    user_data = {"username": user.username, "password": hash_password(user.password)}  # ✅ Fixed function call
    await db.users.insert_one(user_data)
    return {"message": "User Created Successfully"}

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
