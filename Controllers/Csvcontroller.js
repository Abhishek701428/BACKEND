const csv = require('csvtojson');
const json2csv = require('json2csv');
const xlsx = require('xlsx');

const uploadCSV = async (req, res) => {
    console.log('Request received');

    if (!req.file) {
        console.log('No file provided');
        return res.status(400).json({ error: 'No file provided' });
    }

    const fileBuffer = req.file.buffer.toString();
    console.log('File buffer:', fileBuffer);

    try {
        const jsonObj = await csv().fromString(fileBuffer);
        // Process JSON data as needed
        res.json({ data: jsonObj });
    } catch (error) {
        res.status(500).json({ error: 'Error processing CSV file' });
    }
};

const exportCSV = (req, res) => {
    const data = [];

    const csvData = json2csv.parse({ data });
    res.header('Content-Type', 'text/csv');
    res.attachment('export.csv');
    res.send(csvData);
};

const exportXLSX = (req, res) => {
    const data = [];

    const ws = xlsx.utils.json_to_sheet(data);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet 1');
    const xlsxData = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });

    res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.attachment('export.xlsx');
    res.send(xlsxData);
};

module.exports = {
    uploadCSV,
    exportCSV,
    exportXLSX,
};
