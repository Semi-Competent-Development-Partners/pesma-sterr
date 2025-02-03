const note_matrix =[  
    ["E4", "F4", "F#4", "G4", "G#4", "A4"],
    ["H3", "C4", "C#4", "D4", "D#4"],
    ["G3", "G#3", "A3", "A#3", "H3"],
    ["D3", "D#3", "E3", "F3", "F#3"],
    ["A2", "A#2", "H2", "C3", "C#3"],
    ["E2", "F2", "F#2", "G2", "G#2"]
];


function generate_tabs(note_array, element) {
    start_segment(element);
    note_array.forEach(note =>{
        for(let i = 0; i < note_matrix.length; i++) {
            if(note_matrix[i].indexOf(note) !== -1){
                element.innerHTML += note_segment(i, note_matrix[i].indexOf(note));
                break; // da ne trazi nađenu notu više puta
            }
        }
    })
    element.innerHTML += note_segment(5, "") //end segment, ternarni u note_segment mu da .end class za CSS za taktice;
}

function start_segment(element){
    element.innerHTML += 
                            `<div class="segment start">
                                <span class="string-name">E</span>
                                <span class="string-name">H</span>
                                <span class="string-name">G</span>
                                <span class="string-name">D</span>
                                <span class="string-name">A</span>
                                <span class="string-name">E</span>
                            </div>`;
}

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