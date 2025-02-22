from fastapi import FastAPI
from backend.app.api.routes import router
from backend.app.ws.chat import websocket_endpoint  # ✅ Corrected import

app = FastAPI()

app.include_router(router, prefix='/auth')

@app.websocket("/ws/{username}")
async def chat_websocket(websocket, username: str):
    await websocket_endpoint(websocket, username)
