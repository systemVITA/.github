from fastapi import FastAPI
from app.routers import apilogin  

app = FastAPI()

app.include_router(apilogin.router)