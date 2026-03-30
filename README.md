# Gender Classification Web Application

## 📌 Project Overview

This project is a **Gender Classification Web Application** developed using **Python and Flask**.
The application predicts the **gender of a person based on input features**.
This project uses a Convolutional Neural Network (CNN) based Deep Learning model saved in .h5 format using TensorFlow/Keras to classify gender from facial images.

Users can enter input values through a web interface, and the system processes the data and returns the **probability of the predicted gender**.

---

## 🚀 Features

* Web-based interface for user input
* Machine Learning model for gender prediction
* Real-time prediction results
* Simple Flask-based deployment

---

## 🧠 Technologies Used

* Python
* Flask
* NumPy
* Pickle (for loading trained model)
* HTML / CSS

---

## ⚙️ How the System Works

1. The user enters input values in the web form.
2. The data is sent to the Flask backend.
3. The backend converts the inputs into a numerical array.
4. The trained machine learning model (`model.pkl`) processes the data.
5. The predicted probability of the gender is returned and displayed.

---

## Model

## 🤗 Model

The trained deep learning model used in this project is hosted on **Hugging Face Hub**.

Instead of storing the large model file in this repository, it is **automatically downloaded at runtime** using the `huggingface_hub` library.

Model repository:
https://huggingface.co/marriam-003/gender-classification/tree/main

### Model Details

* Model Architecture: **Xception CNN**
* File Name: `gender_classification.h5`
* Framework: **TensorFlow / Keras**

### How the Model is Loaded

```python
from huggingface_hub import hf_hub_download
import tensorflow as tf

model_path = hf_hub_download(
    repo_id="marriam-003/gender-classification",
    filename="xception_v5_03_0.939.h5"
)

model = tf.keras.models.load_model(model_path)
```

The model will be **automatically downloaded from Hugging Face and cached locally** when the application runs.


## 📂 Project Structure

```
## 📁 Project Structure

```gender-classification-app/
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── upload/          # Uploaded images stored here
│
├── templates/
│   └── index.html       # Main web page
│
├── app.py               # Flask application
├── xception_v5_03_0.939.h5  # Deep learning model (CNN - Xception)
├── requirements.txt     # Python dependencies
├── Procfile             # Deployment configuration
└── runtime.txt          # Python runtime version
```


---

## ▶️ How to Run the Project

### 1️⃣ Clone the repository

```
git clone https://github.com/Marriamshahjahan/gender-classification-app.git
```

### 2️⃣ Go to the project directory

```
cd gender-classification-app
```

### 3️⃣ Install required libraries

```
pip install flask numpy
```

### 4️⃣ Run the application

```
python app.py
```

### 5️⃣ Open in browser

```
http://127.0.0.1:5000/
```


OR


## 📥 Download the Project

You can download the complete project directly from GitHub.

1. Open the repository page
   https://github.com/Marriamshahjahan/gender-classification-app

2. Click the **Code** button.

3. Select **Download ZIP**.

4. Extract the ZIP file on your computer.

5. Open the project folder and run the application.

---

## ▶️ Run After Download

1. Install required libraries

```
pip install flask numpy
```

2. Run the Flask application

```
python app.py
```

3. Open in your browser

```
http://127.0.0.1:5000/
```

---

## 📊 Example Output

![Male](Screenshot%202026-03-05%20200143.png)

![Female](Screenshot%202026-03-05%20200216.png)

---

## 👩‍💻 Author

**Marriam Shahjahan Pillai**
M.Tech Artificial Intelligence
TKM College of Engineering

---

## 📜 License

This project is developed for **learning and research purposes**.
