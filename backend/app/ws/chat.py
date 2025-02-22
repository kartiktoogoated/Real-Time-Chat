from fastapi import WebSocket, WebSocketDisconnect
from backend.app.db.config import db, redis_client
import json

class ConnectionManager:
    def __init__(self):
        self.active_connections = {}

    async def connect(self, websocket: WebSocket, username: str):
        await websocket.accept()
        self.active_connections[username] = websocket  # ✅ Fixed incorrect `()` usage
        redis_client.set(f"user:{username}:online", "1")

    def disconnect(self, username: str):
        if username in self.active_connections:
            del self.active_connections[username]
        redis_client.delete(f"user:{username}:online")

    async def send_message(self, message: dict, receiver: str):
        if receiver in self.active_connections:
            await self.active_connections[receiver].send_text(json.dumps(message))
        await db.messages.insert_one(message)  # ✅ Fixed collection reference

manager = ConnectionManager()

async def websocket_endpoint(websocket: WebSocket, username: str):
    await manager.connect(websocket, username)
    try:
        while True:
            data = await websocket.receive_json()
            message = {"sender": username, "receiver": data["receiver"], "message": data["message"]}
            await manager.send_message(message, data["receiver"])
    except WebSocketDisconnect:
        manager.disconnect(username)
