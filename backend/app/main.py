from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import init_db
from .routes import employees, attendance
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="HRMS Lite API",
    description="Human Resource Management System - Employee and Attendance Management",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://hrms-v1sq.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(employees.router)
app.include_router(attendance.router)

@app.on_event("startup")
def startup_event():
    """Initialize database on startup"""
    init_db()

@app.get("/")
def root():
    """Root endpoint"""
    return {
        "message": "HRMS Lite API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}
