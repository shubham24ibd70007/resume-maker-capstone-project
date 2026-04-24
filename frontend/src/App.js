import React, { useState } from 'react';
import './App.css';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';

function App() {
  const [resumeData, setResumeData] = useState({
    name: '', email: '', phone: '', linkedin: '',
    summary: '', skills: '', experience: '', education: ''
  });
  const [template, setTemplate] = useState('modern');

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>✨ AI Resume Maker</h1>
        <p>Build a professional resume in minutes with AI assistance</p>
      </div>

      <div className="template-selector">
        <span>Choose Template:</span>
        {['modern', 'classic', 'minimal'].map(t => (
          <button
            key={t}
            onClick={() => setTemplate(t)}
            className={`template-btn ${template === t ? 'active' : ''}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="main-content">
        <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
        <ResumePreview resumeData={resumeData} template={template} />
      </div>
    </div>
  );
}

export default App;