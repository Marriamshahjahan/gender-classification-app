from huggingface_hub import hf_hub_download
import os
import base64
import numpy as np
import cv2
from flask import Flask, render_template, request, jsonify
import tensorflow as tf

# =======================
# FLASK SETUP
# =======================

app = Flask(__name__)

UPLOAD_FOLDER = "static/upload"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# =======================
# LOAD MODEL
# =======================

# =======================
# LOAD MODEL FROM HUGGING FACE
# =======================

model_path = hf_hub_download(
    repo_id="marriam-003/gender-classification",
    filename="xception_v5_03_0.939.h5"
)

model = tf.keras.models.load_model(model_path)

# Get required input size
input_height = model.input_shape[1]
input_width = model.input_shape[2]


# =======================
# IMAGE PREPROCESS FUNCTION
# =======================

def preprocess_image(image):

    image = cv2.resize(image, (input_width, input_height))
    image = image / 255.0
    image = np.expand_dims(image, axis=0)

    return image


# =======================
# HOME ROUTE
# =======================

@app.route("/")
def home():
    return render_template("index.html")


# =======================
# UPLOAD IMAGE PREDICTION
# =======================

@app.route("/predict_upload", methods=["POST"])
def predict_upload():

    file = request.files["image"]

    if file.filename == "":
        return render_template("index.html")

    filename = file.filename
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    # Read image
    image = cv2.imread(filepath)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    processed = preprocess_image(image)

    prediction = model.predict(processed)[0][0]

    if prediction > 0.5:
        gender = "Male"
        confidence = round(float(prediction * 100), 2)
    else:
        gender = "Female"
        confidence = round(float((1 - prediction) * 100), 2)

    return render_template(
        "index.html",
        prediction=gender,
        confidence=confidence,
        uploaded_image=filename
    )


# =======================
# LIVE CAMERA PREDICTION
# =======================

@app.route("/predict_live", methods=["POST"])
def predict_live():

    data = request.json["image"]

    # Remove base64 header
    encoded_data = data.split(",")[1]
    nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)

    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    processed = preprocess_image(image)

    prediction = model.predict(processed)[0][0]

    if prediction > 0.5:
        gender = "Male"
        confidence = round(float(prediction * 100), 2)
    else:
        gender = "Female"
        confidence = round(float((1 - prediction) * 100), 2)

    return jsonify({
        "prediction": gender,
        "confidence": confidence
    })


# =======================
# RUN SERVER
# =======================

if __name__ == "__main__":
    app.run()