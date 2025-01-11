import json, time
import os.path
import matplotlib
import cv2
matplotlib.use('TkAgg')
import matplotlib.pyplot as plt

import soundfile as sf
import librosa
import numpy as np
from werkzeug.utils import secure_filename
from flask import Flask, render_template, jsonify, request
from keras._tf_keras.keras.models import load_model
app = Flask(__name__)

UPLOAD_FOLDER='uploads'
app.config['UPLOAD_FOLDER']=UPLOAD_FOLDER
MODEL_PATH = 'cnnModel1.h5'
model = load_model(MODEL_PATH)
print(model.summary())

note_classes = {
    "E2": 0, "F2": 1, "F#2": 2, "G2": 3, "G#2": 4, "A2": 5, "A#2": 6, "H2": 7,
    "C3": 8, "C#3": 9, "D3": 10, "D#3": 11, "E3": 12, "F3": 13, "F#3": 14, "G3": 15, "G#3": 16, "A3": 17, "A#3": 18, "H3": 19,
    "C4": 20, "C#4": 21, "D4": 22, "D#4": 23, "E4": 24, "F4": 25, "F#4": 26, "G4": 27, "G#4": 28, "A4": 29
}

inverse_note_classes = {v: k for k, v in note_classes.items()}

def predict_note_from_segment(segment_audio, sr):
    mel_spec = librosa.feature.melspectrogram(y=segment_audio, sr=sr, n_mels=128, fmax=8000)
    mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)
    mel_spec_resized = cv2.resize(mel_spec_db, (128, 128))
    mel_spec_resized = np.expand_dims(mel_spec_resized, axis=-1)
    mel_spec_resized = np.expand_dims(mel_spec_resized, axis=0)
    prediction = model.predict(mel_spec_resized)
    predicted_class = np.argmax(prediction)
    return inverse_note_classes[predicted_class]

def extract_segments(y, sr, threshold_db=-20, min_gap_sec=0.01):
    frame_length = 2048
    hop_length = 512

    # Compute RMS energy and convert to dB
    rms = librosa.feature.rms(y=y, frame_length=frame_length, hop_length=hop_length)[0]
    rms_db = librosa.amplitude_to_db(rms, ref=np.max)

    # Time axis for frames
    times = librosa.frames_to_time(np.arange(len(rms_db)), sr=sr, hop_length=hop_length)

    # Detect segments crossing the threshold
    segments = []
    start_time = None
    for i, db in enumerate(rms_db):
        if db > threshold_db and start_time is None:
            start_time = times[i]
        elif db <= threshold_db and start_time is not None:
            end_time = times[i]
            if end_time - start_time > min_gap_sec:
                segments.append((start_time, end_time))
            start_time = None

    # Handle the last segment
    if start_time is not None:
        segments.append((start_time, times[-1]))
    for idx, (start, end) in enumerate(segments):
        start_sample = int(start * sr)
        end_sample = int(end * sr)
        segment_audio = y[start_sample:end_sample]

        # Save the segment to a WAV file
        output_path = os.path.join('uploads', f"segment_{idx + 1}.wav")
        sf.write(output_path, segment_audio, sr)
        print(f"Saved: {output_path}")
    plt.figure(figsize=(12, 6))
    plt.plot(times, rms_db, label="Loudness (dB)", color="blue")
    plt.axhline(y=threshold_db, color="red", linestyle="--", label=f"Threshold ({threshold_db} dB)")

    # Mark the segments on the plot
    for start, end in segments:
        plt.axvspan(start, end, color="green", alpha=0.3,
                    label="Segment" if "Segment" not in plt.gca().get_legend_handles_labels()[1] else None)

    plt.title("Loudness (dB) Over Time")
    plt.xlabel("Time (s)")
    plt.ylabel("Amplitude (dB)")
    plt.legend()
    plt.grid(True)
    plt.show()
    return segments



@app.route('/')
def hello_world():  # put application's code here
    return render_template("index.html");

@app.route('/notes')
def notes():
    lines = []
    with open("./test_data/test_note.txt", 'r') as file:
        lines = file.readlines()
    lines = [line.replace("\n", "")for line in lines]
    lines = json.dumps(lines)
    return render_template('string_templates_test_JS.html', notes = lines)

@app.route('/test', methods = ['GET', 'POST'])
def test(): 
    print("DB poslat " + request.form['db'])
    threshold_db=int(request.form['db'])*(-1)
    file=request.files['audio_file']
    filename=secure_filename(file.filename)
    file_path=os.path.join(app.config['UPLOAD_FOLDER'],filename)
    file.save(file_path)
    y,sr=librosa.load(file_path,sr=44100)
    segments = extract_segments(y, sr, threshold_db=threshold_db, min_gap_sec=0.01)
    lines = []
    for start_time, end_time in segments:
        start_sample = int(start_time * sr)
        end_sample = int(end_time * sr)
        segment_audio = y[start_sample:end_sample]

        predicted_note = predict_note_from_segment(segment_audio, sr)
        lines.append(predicted_note)
    print(lines)

    #with open("./test_data/test_note.txt", 'r') as file:
    #    lines = file.readlines()
    #lines = [line.replace("\n", "")for line in lines]
    lines = json.dumps(lines)

    return jsonify({'status': 'success', 'lines':lines}), 200

if __name__ == '__main__':
    app.run()
