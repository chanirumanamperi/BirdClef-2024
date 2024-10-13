from flask import Flask, request, jsonify
import joblib
import numpy as np
import librosa

app = Flask(__name__)

# Load the saved model
model = joblib.load('birdclef_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the uploaded file
        file = request.files['audioFile']
        
        # Load the audio file and preprocess it (using the same method from your notebook)
        audio, sr = librosa.load(file, sr=32000)  # Modify sample rate as per your notebook
        features = extract_features(audio, sr)  # Apply the same feature extraction as in the notebook
        
        # Make a prediction using the loaded model
        prediction = model.predict([features])  # Modify according to how your model predicts

        # Format the response
        response = {
            'species': prediction[0],
            'confidence': '90%'  # Placeholder, modify to return actual confidence if needed
        }

        return jsonify(response)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
