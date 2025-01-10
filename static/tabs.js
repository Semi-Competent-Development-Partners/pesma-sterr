const note_matrix =[  
    ["E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5"], 
    ["B3", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5"],
    ["G3", "G#3", "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5", "C#5", "D5"],
    ["D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4"],
    ["A2", "A#2", "B2", "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4", "E4"],
    ["E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2", "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3"]
];


function generate_tabs(note_array) {
    note_array.forEach(note =>{
        for(let i = 0; i < note_matrix.length; i++) {
            if(note_matrix[i].indexOf(note) !== -1){
                document.body.innerHTML += note_segment(i, note_matrix[i].indexOf(note));
                break; // da ne trazi nađenu notu više puta
            }
        }
    })
    document.body.innerHTML += note_segment(5, "")//end_segment();
}

const note_array = JSON.parse(document.getElementById("notes").innerHTML);
generate_tabs(note_array);

function note_segment(string, fret){
                                    //5 zica plus jedna neobelezena = 6 ===> kraj
    let segment = `<div class="segment ${string === 5 && fret === "" ? "end" : ""}">`;
    for(let i = 0; i < string; i++)
        segment += `<span class="note-string"></span>`;
    segment += `<span class="note-string">${fret}</span>`;
    for(let i = 0; i < 6 - string - 1; i++) // 6 - broj zica - 1 [ta na kojoj je ton]
        segment += `<span class="note-string"></span>`;
    return segment + `</div>`
}