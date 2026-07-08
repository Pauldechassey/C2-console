from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..auth import check_password, get_token

router = APIRouter(prefix="/auth", tags=["auth"])


class LoginBody(BaseModel):
    username: str
    password: str


@router.post("/login")
def login(body: LoginBody):
    if not check_password(body.username, body.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"token": get_token()}
