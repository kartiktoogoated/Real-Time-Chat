from fastapi import HTTPException, Depends
from passlib.context import CryptContext
from jose import JWTError, jwt
import os
from datetime import datetime, timedelta
from db.config import db

SECRET_KEY = os.getenv("SECRET_KEY","your_secret_key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated = "auto")

def hash_password(password : str):
    return pwd_context.hash(password)

async def verify_password(username: str , password: str):
    user = await db.users.find_one({"username", username})
    if user and verify_password(password,user["password"]):
        return user
    return None

async def create_user(user):
    user_exist = await db.users.find_one({"username": user.username})
    if user_exist:
        raise HTTPException(status_code=400, detail="Username Already Exists")
    user_data = {"username":user.username, "password":hash_password}
    await db.users.insert_one(user_data)
    return {"message": "User Created Successfully"}