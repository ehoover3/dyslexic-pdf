import React, { useState } from "react";
import jsPDF from "jspdf";

const PdfGenerator = () => {
  const [inputText, setInputText] = useState("Enter text here");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const generatePDF = (font) => {
    const doc = new jsPDF();

    doc.addFileToVFS("OpenDyslexic3-Regular-normal.ttf", font);
    doc.addFont("OpenDyslexic3-Regular.ttf", "OpenDyslexic3-Regular", "normal");
    doc.setFont("OpenDyslexic3-Regular");

    const text = `Hello, ${inputText || "this is a sample"} PDF!`;

    // Set a comfortable margin and calculate the remaining space
    const margin = 10;
    const availableHeight = doc.internal.pageSize.height - 2 * margin;
    const textLines = doc.splitTextToSize(text, doc.internal.pageSize.width - 2 * margin); // Split text into lines to fit in available height
    let y = margin; // Set initial y-coordinate

    // Add each line to the PDF
    textLines.forEach((line) => {
      if (y + doc.getTextDimensions(line).h > availableHeight) {
        // If line goes beyond available height, add new page
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += doc.getTextDimensions(line).h + 2; // Add a small vertical gap
    });

    doc.save("sample.pdf");
  };

  return (
    <div>
      <h1>React PDF Generator</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor='pdfText'>Enter Text: </label>
        <textarea id='pdfText' value={inputText} onChange={handleInputChange} style={{ resize: "vertical", minHeight: "100px" }} />
      </div>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default PdfGenerator;
