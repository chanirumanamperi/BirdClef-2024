const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const axios = require('axios');  // Import axios to call Flask API
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

app.post('/upload', upload.single('audioFile'), async (req, res) => {
  try {
    const filePath = req.file.path;

    // Send the file to Flask for prediction
    const formData = new FormData();
    formData.append('audioFile', req.file);

    const predictionResponse = await axios.post('http://localhost:5000/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    const prediction = predictionResponse.data;

    res.json({
      message: "Prediction successful.",
      prediction
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing file", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
