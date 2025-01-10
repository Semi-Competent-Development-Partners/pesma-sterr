async function uploadAudio() {
    const fileInput = document.getElementById('audioInput');
    const audioPlayer = document.getElementById('audioPlayer');

    if (fileInput.files.length === 0) {
        alert('Izaberite jedan .wav audio fajl.');
        return;
    }

    const file = fileInput.files[0];
    const audioUrl = URL.createObjectURL(file);

    audioPlayer.src = audioUrl;
    audioPlayer.load();
    const noteDiv = document.getElementById('note-div');

    noteDiv.innerHTML = "";
    noteDiv.classList.add("loader");

    const formData = new FormData();
    formData.append('audio_file', file);

    try {
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
            noteDiv.classList.remove("loader");
            generate_tabs(JSON.parse(data.lines), noteDiv);
            handleLayoutChange(); //iz taktice.js
            console.log('Upload i slanje uspešni!');
        } else {
            console.error('Upload i slanje neuspešni:', data.message);
        }

    } catch (error) {
        console.error('Neuspešan upload audio fajla:', error);
    }
}