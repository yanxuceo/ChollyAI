from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware to allow connections from Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_json()
            # Echo back the data for testing
            await websocket.send_json(data)
    except Exception as e:
        print(f"WebSocket error: {e}")

# Add a health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "ok"} 