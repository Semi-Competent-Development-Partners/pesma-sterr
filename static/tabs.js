const note_matrix =[  ["E4", "F4", "F#4,", "G4", "G#4"],
                            ["B3", "C4", "C#4", "D4", "D#4"],
                            ["G3", "G#3", "A3", "A#3", "B3"],
                            ["D3", "D#3", "E3", "F3", "F#3"],
                            ["A2", "A#2", "B2", "C3", "C#3"],
                            ["E2", "F2", "F#2", "G2", "G#2"]]


function generate_tabs(note_array) {
    note_array.forEach(note =>{
        for(let i = 0; i < note_matrix.length; i++) {
            if(note_matrix[i].indexOf(note) !== -1){
                switch (i){
                    case 0:
                        document.body.innerHTML += e4_segment(note_matrix[i].indexOf(note));
                        break;
                    case 1:
                        document.body.innerHTML += b_segment(note_matrix[i].indexOf(note));
                        break;
                    case 2:
                        document.body.innerHTML += g_segment(note_matrix[i].indexOf(note));
                        break;
                    case 3:
                        document.body.innerHTML += d_segment(note_matrix[i].indexOf(note));
                        break;
                    case 4:
                        document.body.innerHTML += a_segment(note_matrix[i].indexOf(note));
                        break;
                    case 5:
                        document.body.innerHTML += e2_segment(note_matrix[i].indexOf(note));
                        break;
                }
                break; // da ne trazi nađenu notu više puta
            }
        }
    })
    document.body.innerHTML += end_segment();
}

const note_array = JSON.parse(document.getElementById("notes").innerHTML);
generate_tabs(note_array);

function e2_segment(fret){
    return `<div class="e2-string segment">
                <span class="note-string"></span>
                <span class="note-string"></span>
                <span class="note-string"></span>
                <span class="note-string"></span>
                <span class="note-string"></span>
                <span class="note-string">${fret}</span>
            </div>`;
}

function a_segment(fret){
    return `<div class="e2-string segment">
                <span class="note-string"></span>
                <span class="note-string"></span>
                <span class="note-string"></span>
                <span class="note-string"></span>
                <span class="note-string">${fret}</span>
                <span class="note-string"></span>
            </div>`;
}

function d_segment(fret){
    return `<div class="e2-string segment">
                <span class="note-string"></span>
                <span class="note-string"></span>
                <span class="note-string"></span>
                <span class="note-string">${fret}</span>
                <span class="note-string"></span>
                <span class="note-string"></span>
            </div>`;
}

function g_segment(fret){
    return `<div class="e2-string segment">
                <span class="note-string"></span>
                <span class="note-string"></span>
                <span class="note-string">${fret}</span>
                <span class="note-string"></span>
                <span class="note-string"></span>
                <span class="note-string"></span>
            </div>`;
}

function b_segment(fret){
    return `<div class="e2-string segment">
                <span class="note-string"></span>
                <span class="note-string">${fret}</span>
                <span class="note-string"></span>
                <span class="note-string"></span>
                <span class="note-string"></span>
                <span class="note-string"></span>
            </div>`;
}

function e4_segment(fret){
    return `<div class="e2-string segment">
                <span class="note-string">${fret}</span>
                <span class="note-string"></span>
                <span class="note-string"></span>
                <span class="note-string"></span>
                <span class="note-string"></span>
                <span class="note-string"></span>
            </div>`;
}

function end_segment(){
    return `<div class="end segment">
                <span class="note-string"></span>
                <span class="note-string"></span>
                <span class="note-string"></span>
                <span class="note-string"></span>
                <span class="note-string"></span>
                <span class="note-string"></span>
            </div>`;
}