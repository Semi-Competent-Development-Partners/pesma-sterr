let imageData;

async function uploadAudio() {
    const fileInput = document.getElementById('audioInput');
    const audioPlayer = document.getElementById('audioPlayer');

    const uploadBtn = document.querySelector("#uploadBtn");
    const showMatplotBtn = document.querySelector("#showMatplotBtn");
    const showMatplotLbl = document.querySelector("#showMatplotLbl");

    if (fileInput.files.length === 0) {
        alert('Izaberite .wav audio fajl.');
        return;
    }

    const file = fileInput.files[0];
    audioPlayer.src = URL.createObjectURL(file);
    audioPlayer.load();
    const noteDiv = document.getElementById('note-div');

    noteDiv.innerHTML = "";
    noteDiv.classList.add("loader");

    const formData = new FormData();
    formData.append('audio_file', file);

    const db_value = document.getElementById('db_input').value;
    formData.append('db', db_value);

    const radio = document.querySelector("input[type='radio']:checked").value;
    formData.append('tempo', radio);

    try {
        uploadBtn.style.display = "none";
        const response = await fetch('/test', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) { //ako nije 200 status-code
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        //status je deo JSON response object-a koji flask vraca, =/= status-code (200, 400, 500...)
        if (data.status === 'success') {
            noteDiv.innerHTML = "";
            noteDiv.classList.remove("loader");
            generate_tabs(JSON.parse(data.lines), noteDiv);
            handleLayoutChange(); //iz taktice.js
            console.log('Upload i slanje uspešni!');

            imageData = data.image;
            showMatplotBtn.style.display = "inline-block";
            showMatplotLbl.style.display = showMatplotBtn.style.display;
        } else {
            /*console.error*/
            alert('Upload i slanje neuspešni:', data.message);
            showMatplotBtn.style.display = "none";
            showMatplotLbl.style.display = showMatplotBtn.style.display;
        }
        uploadBtn.style.display = "inline-block";
    } catch (error) {
        console.error('Neuspešan upload audio fajla:', error);
    }
}

function showMatPlot(){
    // Create a new window for the image
            const popup = window.open("", "Plot Image", "width=600,height=400");

            // Create an HTML string for the image
            const html =
                                  `<!DOCTYPE html>
                                  <html lang="en">
                                  <head>
                                    <title>Matplotlib Graph</title>
                                  </head>
                                  <body>
                                    <img src="data:image/png;base64,${imageData}" alt="Matplotlib Plot">
                                  </body>
                                  </html>
                                `;
            // Set the content of the popup window
            popup.document.write(html);
}