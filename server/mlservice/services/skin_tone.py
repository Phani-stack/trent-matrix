import cv2
import numpy as np

def detect_skin_tone(image):

    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    h, w, _ = image.shape

    center = hsv[h//3:2*h//3, w//3:2*w//3]

    if center.size == 0:
        return "Unknown"

    avg_v = np.mean(center[:, :, 2])
    avg_h = np.mean(center[:, :, 0])

    if avg_v > 180:
        tone = "Fair"
    elif avg_v > 130:
        tone = "Medium"
    else:
        tone = "Dark"

    if avg_h < 20 or avg_h > 160:
        undertone = "Warm"
    elif 20 <= avg_h <= 35:
        undertone = "Neutral"
    else:
        undertone = "Cool"

    return f"{tone} {undertone}"