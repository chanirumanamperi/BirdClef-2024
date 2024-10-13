const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Static folder to serve files (optional)
app.use(express.static(path.join(__dirname, 'uploads')));

// Upload route to handle the audio file from the front-end
app.post('/upload', upload.single('audioFile'), (req, res) => {
  try {
    // File info
    const filePath = req.file.path;
    
    // You would pass this filePath to the model for processing (mocking it here)
    console.log(`File uploaded: ${filePath}`);

    // Simulate prediction result (replace with actual model prediction logic)
    const prediction = {
      species: "Northern Cardinal",
      confidence: "92%"
    };

    // Send the prediction result back to the front-end
    res.json({
      message: "File uploaded and processed successfully.",
      prediction
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing file", error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
