import logging
import os
from typing import List
from fastapi import FastAPI
from routers import browse

app = FastAPI()
app.include_router(browse.browser, prefix="/browse", tags=["Browse Articles"])


# if 'DEBUG' in os.environ:
# import debugpy
# debugpy.listen(("0.0.0.0", 5678))
# # Pause the program until a remote debugger is attached
# debugpy.wait_for_client()

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format="%(levelname)s: %(asctime)s  - %(message)s",
)

logger = logging.getLogger(__name__)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8080)
