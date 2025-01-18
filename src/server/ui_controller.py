from typing import Literal

ViewType = Literal["home", "weather", "workout", "transport"]

class UIController:
    def __init__(self, websocket_server):
        self.ws = websocket_server
        
    async def switch_view(self, view_type: ViewType, data: dict):
        await self.ws.send_json({
            "type": "VIEW_CHANGE",
            "view": view_type,
            "data": data
        })

# OpenAI function definition
ui_functions = [
    {
        "name": "switch_view",
        "description": "Switch the UI view based on conversation context",
        "parameters": {
            "type": "object",
            "properties": {
                "view_type": {
                    "type": "string",
                    "enum": ["home", "weather", "workout", "transport"]
                },
                "data": {
                    "type": "object"
                }
            }
        }
    }
] 