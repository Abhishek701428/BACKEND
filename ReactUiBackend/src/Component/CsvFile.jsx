import React, { useState } from 'react';

function CsvFile() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      console.error('No file selected');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
    console.log('FormData:', formData); // Add this line for debugging
  
    fetch('http://localhost:3000/user/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };
  const handleExportCSV = () => {
    window.location.href = 'http://localhost:3000/user/export-csv';
  };

  const handleExportXLSX = () => {
    window.location.href = 'http://localhost:3000/user/export-xlsx';
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload CSV</button>
      <button onClick={handleExportCSV}>Export to CSV</button>
      <button onClick={handleExportXLSX}>Export to XLSX</button>
    </div>
  );
}

export default CsvFile;
