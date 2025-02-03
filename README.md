# Guitar tab generator
Python Flask application which generates a guitar tab display based on the submitted audio recording.

### Input
The recording is split into segments based on the loudness (amplitude) level changes.  
A segment is considered a piece of the signal in which the amplitude rises above and falls below the user's input **db** level.  
Each segment is visually represented in the form of a Mel Spectrogram image.  
The images are used as inputs based on which a trained CNN model gives predictions of the musical notes in the images.  

### Output
Once an output array of notes is returned as a response to the submitted request, a responsive guitar tablature is represented dynamically to the user.  
![image1](https://github.com/user-attachments/assets/331985ad-3471-43fa-a34e-ae1258a6d539)
<p align="center"><em>Output tablature example</em></p>
  
A loudness chart graph is also displayed to the user so that detection errors can be avoided by setting a different loudness threshold and re-submitting the request.  
![image2](https://github.com/user-attachments/assets/acc7f550-98e1-45ed-a274-425ad87c9474)

<p align="center"><em>Output chart example</em></p>


## Build/Project Setup instructions

Install the following packages:  
  ```pip install opencv-python librosa flask tensorflow matplotlib -r requirements```
