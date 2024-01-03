from fastapi import Depends, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from jwt import encode as jwt_encode
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import mysql.connector
from mysql.connector import errorcode


router = APIRouter()

router.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    username: str = None  
    email: str
    password: str


try:
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="vita",
        port=3307
    )
except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Error: Access denied. Check your credentials.")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Error: The specified database does not exist.")
    else:
        print("Error:", err)
    exit(1)

cursor = connection.cursor()


SECRET_KEY = "your-secret-key-goes-here"
security = HTTPBearer()

@router.get("/")
def homepage():
    return {"message": "Welcome to the homepage"}

@router.post("/login")
def login(user: User):
    
    query = "SELECT * FROM users WHERE email = %s AND password = %s"
    cursor.execute(query, (user.email, user.password))
    user_data = cursor.fetchone()

    if user_data:
        
        token = generate_token(user.email)
        user_dict = {
            "username": user_data[1],  
            "email": user_data[2]  
        }
        user_dict["token"] = token
        return user_dict

    return {"message": "Invalid email or password"}

@router.post("/register")
def register(user: User):

    query = "SELECT * FROM users WHERE email = %s"
    cursor.execute(query, (user.email,))
    existing_user = cursor.fetchone()

    if existing_user:
        return {"message": "User already exists"}


    query = "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)"
    cursor.execute(query, (user.username, user.email, user.password))
    connection.commit()


    token = generate_token(user.email)
    user_dict = {
        "username": user.username,
        "email": user.email
    }
    user_dict["token"] = token
    return user_dict

@router.get("/api/user")
def get_user(credentials: HTTPAuthorizationCredentials = Depends(security)):

    token = credentials.credentials

    user_data = {
        "username": "John Doe",
        "email": "johndoe@example.com"
    }
    if user_data["username"] and user_data["email"]:
        return user_data
    raise HTTPException(status_code=401, detail="Invalid token")


@router.get("/api/users/{username}")
def get_user_details(username: str):
    query = "SELECT username, email FROM users WHERE username = %s"
    cursor.execute(query, (username,))
    user_data = cursor.fetchone()
    if user_data:
        user_details = {
            "username": user_data[0],
            "email": user_data[1]
        }
        return user_details
    raise HTTPException(status_code=404, detail="User not found")

@router.put("/api/users/{username}")
def update_user_details(username: str, user: User):
    query = "UPDATE users SET password = %s WHERE username = %s"
    cursor.execute(query, (user.password, username))
    connection.commit()
    return {"message": "User details updated successfully"}

@router.delete("/api/users/{username}")
def delete_user(username: str):
    query = "DELETE FROM users WHERE username = %s"
    cursor.execute(query, (username,))
    connection.commit()
    return {"message": f"User {username} deleted successfully"}

def generate_token(email: str) -> str:
    payload = {"email": email}
    token = jwt_encode(payload, SECRET_KEY, algorithm="HS256")
    return token

