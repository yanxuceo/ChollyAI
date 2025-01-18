import asyncio
import websockets
import json

async def test_view_switch():
    uri = "ws://localhost:8000/ws"
    async with websockets.connect(uri) as websocket:
        # Test switching to weather view
        await websocket.send(json.dumps({
            "type": "VIEW_CHANGE",
            "view": "weather",
            "data": {"temperature": 22, "condition": "sunny"}
        }))

asyncio.get_event_loop().run_until_complete(test_view_switch()) 