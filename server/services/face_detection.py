import cv2
import mediapipe as mp
import numpy as np

mp_face_mesh = mp.solutions.face_mesh

face_mesh = mp_face_mesh.FaceMesh(
    static_image_mode=True,
    max_num_faces=1,
    refine_landmarks=True,
    min_detection_confidence=0.7
)

def dist(p1, p2, w, h):
    return np.sqrt(
        ((p1.x - p2.x) * w) ** 2 +
        ((p1.y - p2.y) * h) ** 2
    )

def detect_face_shape(image):

    rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = face_mesh.process(rgb)

    if not results.multi_face_landmarks:
        return "Face Not Detected", 0

    landmarks = results.multi_face_landmarks[0]
    h, w, _ = image.shape

    top = landmarks.landmark[10]
    chin = landmarks.landmark[152]
    left_cheek = landmarks.landmark[234]
    right_cheek = landmarks.landmark[454]
    left_jaw = landmarks.landmark[172]
    right_jaw = landmarks.landmark[397]
    left_forehead = landmarks.landmark[71]
    right_forehead = landmarks.landmark[301]

    face_length = dist(top, chin, w, h)
    cheek_width = dist(left_cheek, right_cheek, w, h)
    jaw_width = dist(left_jaw, right_jaw, w, h)
    forehead_width = dist(left_forehead, right_forehead, w, h)

    length_width_ratio = face_length / cheek_width
    jaw_cheek_ratio = jaw_width / cheek_width
    forehead_jaw_ratio = forehead_width / jaw_width

    scores = {
        "Oval": abs(length_width_ratio - 1.75),
        "Rectangle": abs(length_width_ratio - 1.55),
        "Round": abs(length_width_ratio - 1.30),
        "Square": abs(jaw_cheek_ratio - 1.0),
        "Heart": abs(jaw_cheek_ratio - 0.85),
        "Diamond": abs(forehead_jaw_ratio - 0.90)
    }

    shape = min(scores, key=scores.get)
    error = scores[shape]

    confidence = max(60, round(100 - (error * 120), 2))
    confidence = min(confidence, 99)

    return shape, confidence