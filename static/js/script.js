document.addEventListener("DOMContentLoaded", function () {

    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const placeholder = document.querySelector(".placeholder");
    const predictionText = document.getElementById("prediction-text");
    const uploadedImg = document.getElementById("uploaded-img");

    let stream = null;

    // ================= START CAMERA =================
    window.startCamera = async function () {

        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            });

            video.srcObject = stream;

            video.style.display = "block";
            canvas.style.display = "block";

            if (placeholder) placeholder.style.display = "none";
            if (uploadedImg) uploadedImg.style.display = "none";

        } catch (error) {
            alert("Camera not working. Please allow permission.");
            console.error(error);
        }
    };

    // ================= STOP CAMERA =================
    // ================= STOP CAMERA =================
window.stopCamera = function () {

    if (stream) {
        stream.getTracks().forEach(track => {
            track.stop();
        });
        stream = null;
    }

    // Completely remove video source
    if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }

    // Hide camera elements
    video.style.display = "none";
    canvas.style.display = "none";

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Show placeholder again
    if (placeholder) {
        placeholder.style.display = "flex";
    }

    // Hide prediction if it was from live
    if (predictionText) {
        predictionText.innerText = "";
        predictionText.style.display = "none";
    }
};
    // ================= CAPTURE & PREDICT =================
    window.capture = function () {

        if (!video.srcObject) {
            alert("Start camera first!");
            return;
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0);

        const imageData = canvas.toDataURL("image/jpeg");

        fetch("/predict_live", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: imageData })
        })
        .then(res => res.json())
        .then(data => {

            const text = data.prediction + " (" + data.confidence + "%)";

            // Show prediction above image
            predictionText.innerText = text;
            predictionText.style.display = "block";

            // Draw text on image
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.fillText(text, 20, 40);

        })
        .catch(err => console.error(err));
    };

    // ================= CLEAR EVERYTHING =================
    window.clearAll = function () {

        // Stop camera if running
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }

        if (video.srcObject) {
            video.srcObject = null;
        }

        // Hide camera
        video.style.display = "none";
        canvas.style.display = "none";

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = 0;
        canvas.height = 0;

        // Hide uploaded image
        if (uploadedImg) {
            uploadedImg.style.display = "none";
        }

        // Clear prediction
        predictionText.innerText = "";
        predictionText.style.display = "none";

        // Restore placeholder
        if (placeholder) {
            placeholder.style.display = "flex";
        }
    };

    // ================= HIDE PLACEHOLDER IF IMAGE EXISTS =================
    if (uploadedImg && uploadedImg.src && uploadedImg.src !== window.location.href) {
        uploadedImg.style.display = "block";
        if (placeholder) placeholder.style.display = "none";
    }

});