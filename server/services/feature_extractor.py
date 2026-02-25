import tensorflow as tf
import numpy as np
import cv2

# Load pretrained MobileNetV2
model = tf.keras.applications.MobileNetV2(
    weights='imagenet',
    include_top=False,
    pooling='avg'
)

def extract_features(image):
    img = cv2.resize(image, (224, 224))
    img = tf.keras.applications.mobilenet_v2.preprocess_input(img)
    img = np.expand_dims(img, axis=0)

    features = model.predict(img, verbose=0)
    return features.flatten()