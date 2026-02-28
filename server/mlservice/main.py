from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import numpy as np
import cv2
import os

from services.face_detection import detect_face_shape
from services.skin_tone import detect_skin_tone
from services.recommender import generate_recommendation


app = FastAPI(title="Trend Matrix AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


@app.get("/", response_class=HTMLResponse)
def home():
    with open(os.path.join(STATIC_DIR, "index.html"), "r", encoding="utf-8") as f:
        return f.read()


@app.post("/analyze")
async def analyze(
    gender: str = Form(...),
    height: float = Form(...),
    weight: float = Form(...),
    hips: float = Form(...),
    waist: float = Form(...),
    file: Optional[UploadFile] = File(None),
):

    if file is None:
        return {"error": "No image provided"}

    contents = await file.read()
    if not contents:
        return {"error": "Empty image received"}

    np_image = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(np_image, cv2.IMREAD_COLOR)

    if image is None:
        return {"error": "Failed to decode image"}

    face_shape, confidence = detect_face_shape(image)

    if face_shape == "Face Not Detected":
        return {"error": "No clear face detected. Please look straight at the camera."}

    skin_data = detect_skin_tone(image)

    result = generate_recommendation(
        face_shape=face_shape,
        skin_tone=skin_data,
        height=height,
        weight=weight,
        gender=gender
    )

    result["confidence_score"] = confidence

    return result




@app.get("/health")
def health():
    return {"status": "Trend Matrix AI running successfully"}
