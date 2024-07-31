document.addEventListener('DOMContentLoaded', function() {
    const filePath = 'http://localhost/Mulah%20Tech%20Assignment/Table_Input.csv'; // Ensure this path is correct
    fetch(filePath, { mode: 'cors' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            const json = Papa.parse(data, { header: false }).data;
            console.log('Data converted to JSON:', json);

            if (json.length === 0) {
                throw new Error('The CSV file is empty or not formatted correctly.');
            }

            populateTable('table1', json);
            populateTable('table2', calculateTable2(json));
        })
        .catch(error => console.error('Error reading CSV file:', error));
});

function populateTable(tableId, data) {
    const table = document.getElementById(tableId);
    table.innerHTML = ''; // Clear previous table content
    data.forEach(row => {
        const tr = table.insertRow();
        row.forEach(cell => {
            const td = tr.insertCell();
            td.textContent = cell;
        });
    });
}

function calculateTable2(table1Data) {
    if (table1Data.length < 21) {
        throw new Error('Insufficient data in Table 1.');
    }

    const alpha = parseFloat(table1Data[5][1]) + parseFloat(table1Data[20][1]); // A5 + A20
    const beta = parseFloat(table1Data[15][1]) / parseFloat(table1Data[7][1]);  // A15 / A7
    const charlie = parseFloat(table1Data[13][1]) * parseFloat(table1Data[12][1]); // A13 * A12

    return [
        ["Category", "Value"],
        ["Alpha", alpha],
        ["Beta", beta.toFixed(2)],
        ["Charlie", charlie]
    ];
}
