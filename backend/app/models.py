from pydantic import BaseModel, EmailStr, Field
from datetime import date
from typing import Optional


class EmployeeBase(BaseModel):
    employee_id: str = Field(..., min_length=1, max_length=50)
    full_name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr
    department: str = Field(..., min_length=1, max_length=100)

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeResponse(EmployeeBase):
    id: int
    created_at: str
    
    class Config:
        from_attributes = True


class AttendanceBase(BaseModel):
    employee_id: str = Field(..., min_length=1, max_length=50)
    date: date
    status: str = Field(..., pattern="^(Present|Absent)$")

class AttendanceCreate(AttendanceBase):
    pass

class AttendanceResponse(AttendanceBase):
    id: int
    created_at: str
    
    class Config:
        from_attributes = True


class ErrorResponse(BaseModel):
    detail: str
