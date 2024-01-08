// App.js
import React, { useState } from "react";
import "./App.css";
import UnderstandDyslexia from "./pages/UnderstandDyslexia";
import HowTheFontWorks from "./pages/HowTheFontWorks";
import MakeAPDF from "./pages/MakeAPdf";
import MoreResources from "./pages/MoreResources";

function App() {
  const [activeSection, setActiveSection] = useState("pdf");

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className='AppContainer'>
      <div className='Sidebar'>
        <button className='SidebarButton' onClick={() => handleButtonClick("understand")}>
          UNDERSTAND DYSLEXIA
        </button>
        <button className='SidebarButton' onClick={() => handleButtonClick("font")}>
          HOW THE FONT WORKS
        </button>
        <button className='SidebarButton' onClick={() => handleButtonClick("pdf")}>
          MAKE A PDF
        </button>
        <button className='SidebarButtonAlternate' onClick={() => handleButtonClick("resources")}>
          MORE RESOURCES
        </button>
      </div>

      <div className='MainContent'>
        {activeSection === "understand" && <UnderstandDyslexia />}
        {activeSection === "font" && <HowTheFontWorks />}
        {activeSection === "pdf" && <MakeAPDF />}
        {activeSection === "resources" && <MoreResources />}
      </div>
    </div>
  );
}

export default App;
