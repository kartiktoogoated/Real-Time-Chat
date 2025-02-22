from motor.motor_asyncio import AsyncIOMotorClient
import redis
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Database Clients
client = AsyncIOMotorClient(MONGO_URI)
db = client["chat-database"]

redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)
