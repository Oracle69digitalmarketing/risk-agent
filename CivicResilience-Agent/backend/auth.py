from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel
from utils.utils import hash_password, verify_password, create_access_token, decode_access_token
from db import get_conn, get_user_by_email

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    email: str
    password: str
    role: str = "responder"

# 🔐 Login endpoint
@router.post("/login")
def login(data: LoginRequest):
    user = get_user_by_email(data.email)
    if not user or not verify_password(data.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user["email"], "role": user["role"]})
    return {"token": token, "user": {"email": user["email"], "role": user["role"]}}

# 🆕 Register endpoint
@router.post("/register")
def register(data: RegisterRequest):
    if get_user_by_email(data.email):
        raise HTTPException(status_code=400, detail="User already exists")
    conn = get_conn(); c = conn.cursor()
    hashed = hash_password(data.password)
    c.execute("INSERT INTO users (email, hashed_password, role) VALUES (?, ?, ?)",
              (data.email, hashed, data.role))
    conn.commit(); conn.close()
    return {"message": "✅ User registered successfully"}

# 🧠 Get current user from token
@router.get("/me")
def get_me(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing token")
    token = auth_header.split(" ")[1]
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return {"email": payload["sub"], "role": payload["role"]}
