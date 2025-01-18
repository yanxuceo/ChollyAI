from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Example workout data
workout_data = {
    "type": "Running",
    "duration": 1800,  # 30 minutes in seconds
    "calories": 350,
    "steps": 4500,
    "heartRate": 128
}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("Client connected")
    try:
        while True:
            message = await websocket.receive_json()
            print(f"Received message: {json.dumps(message, indent=2)}")
            
            # Handle view changes
            if "view" in message:
                response_data = {
                    "view": message["view"],
                    "data": None
                }
                
                # Add specific data for each view
                if message["view"] == "workout":
                    response_data["data"] = workout_data
                
                print(f"Sending response: {json.dumps(response_data, indent=2)}")
                await websocket.send_json(response_data)
            else:
                await websocket.send_json(message)
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        print("Client disconnected")

@app.get("/health")
async def health_check():
    return {"status": "ok"} 