import React, { useState } from "react";
import jsPDF from "jspdf";
import "./App.css";

const PdfGenerator = () => {
  const [text, setText] = useState("Enter text here");

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const generatePDF = (font) => {
    const doc = new jsPDF();

    doc.addFileToVFS("fonts/OpenDyslexic3-Regular-normal.ttf", font);
    doc.addFont("fonts/OpenDyslexic3-Regular.ttf", "OpenDyslexic3-Regular", "normal");
    doc.setFont("OpenDyslexic3-Regular");

    // Set a comfortable margin and calculate the remaining space
    const margin = 10;
    const availableHeight = doc.internal.pageSize.height - margin;
    const textLines = doc.splitTextToSize(text, doc.internal.pageSize.width - 2 * margin); // Split text into lines to fit in available height
    let y = margin + 10; // Set initial y-coordinate

    // Add each line to the PDF
    textLines.forEach((line) => {
      if (y + doc.getTextDimensions(line).h > availableHeight) {
        // If line goes beyond available height, add new page
        doc.addPage();
        y = margin + 10;
      }
      doc.text(line, margin, y);
      y += doc.getTextDimensions(line).h + 2; // Add inter-line gap
    });

    doc.save("sample.pdf");
  };

  return (
    <div className='TextAreaButtonContainer'>
      <textarea id='TextArea' value={text} onChange={handleInputChange} className='text-input' />
      <button onClick={generatePDF} className='Button'>
        Generate PDF
      </button>
    </div>
  );
};

export default PdfGenerator;
