from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import socketio
import json

app = FastAPI()
sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins=['http://localhost:3000'])
socket_app = socketio.ASGIApp(sio, app)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store connected clients
connected_clients = set()

@app.post("/switch_view")
async def switch_view(view_data: dict):
    """
    Example view_data:
    {
        "view": "weather",
        "data": {
            "temperature": 22,
            "condition": "Sunny"
        }
    }
    """
    # Emit view change to all connected clients
    await sio.emit('VIEW_CHANGE', view_data)
    return {"status": "success"}

@sio.event
async def connect(sid, environ):
    connected_clients.add(sid)
    print(f"Client connected: {sid}")

@sio.event
async def disconnect(sid):
    connected_clients.remove(sid)
    print(f"Client disconnected: {sid}")

# Test endpoint to switch views
@app.get("/test/{view_name}")
async def test_view(view_name: str):
    test_data = {
        "workout": {
            "view": "workout",
            "data": {
                "type": "Running",
                "duration": 30,
                "calories": 350
            }
        },
        "weather": {
            "view": "weather",
            "data": {
                "temperature": 22,
                "condition": "Sunny"
            }
        },
        "transport": {
            "view": "transport",
            "data": {
                "route": "Bus 123",
                "nextArrival": "5 min",
                "status": "On time"
            }
        },
        "home": {
            "view": "home",
            "data": None
        }
    }
    
    view_data = test_data.get(view_name, test_data["home"])
    await sio.emit('VIEW_CHANGE', view_data)
    return {"status": "success", "view": view_name}

app = socketio.ASGIApp(sio, app) 