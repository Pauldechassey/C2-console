from typing import Annotated

from fastapi import APIRouter, Form, HTTPException
from pydantic import BaseModel
from ..auth import check_password, get_token

router = APIRouter(prefix="/auth", tags=["auth"])


class LoginBody(BaseModel):
    username: str
    password: str


@router.post("/login")
def login(body: LoginBody | None = None, username: Annotated[str | None, Form()] = None, password: Annotated[str | None, Form()] = None):
    if body is not None:
        username_value = body.username
        password_value = body.password
    else:
        username_value = username
        password_value = password

    if not username_value or not password_value:
        raise HTTPException(status_code=422, detail="username and password are required")

    if not check_password(username_value, password_value):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"token": get_token()}
