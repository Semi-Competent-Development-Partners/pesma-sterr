function findFirstAndLastItemsInEachRow(container) {
    const children = Array.from(container.children);
    const rows = [];

    let currentRow = [];
    let currentTop = null;

    for (const child of children) {
           //zbog prvog reda           //offsetTop === udaljenost od vrha roditelja (po tome se detektuju redovi)
        if (currentTop === null || child.offsetTop !== currentTop) {
            // ako predjemo u novi red (^) onda ide dodavanje novog objekta u rows
            if (currentRow.length > 0) {
                rows.push({ firstItem: currentRow[0], lastItem: currentRow[currentRow.length - 1] });
            }
            currentRow = [];
            currentTop = child.offsetTop;
        }
        currentRow.push(child);
    }

    // poslednji red
    if (currentRow.length > 0) {
        rows.push({ firstItem: currentRow[0], lastItem: currentRow[currentRow.length - 1] });
    }

    return rows;
}


const container = document.querySelector('#note-div');
const rowInfo = findFirstAndLastItemsInEachRow(container);

rowInfo.forEach((row, index) => {
    row.firstItem.style.borderLeft = row.firstItem.classList.contains("start") ? "" : '1px solid black';
    row.lastItem.style.borderRight = row.lastItem.classList.contains("end") ? row.lastItem.style.borderRight : '1px solid black';
});

window.addEventListener('resize', handleLayoutChange);
window.addEventListener('zoom', handleLayoutChange);
// funkcija koja se poziva na 'zoom' i 'resize' (i u request.js fajlu kad se dobiju note)
function handleLayoutChange() {
    let segments = document.querySelectorAll(".segment");
    if (segments.length === 0)
        return;
    segments = document.querySelectorAll('.segment:not(.start):not(.end)');

    segments.forEach(segment => {
        segment.style.borderLeft = 'none';
        segment.style.borderRight = 'none';
    });
    const newRowInfo = findFirstAndLastItemsInEachRow(container);
    // pazi na start i end segmente
    newRowInfo.forEach((row, index) => {
        row.firstItem.style.borderLeft = row.firstItem.classList.contains("start") ? "" : '1px solid black';
        row.lastItem.style.borderRight = row.lastItem.classList.contains("end") ? row.lastItem.style.borderRight : '1px solid black';
    });
};