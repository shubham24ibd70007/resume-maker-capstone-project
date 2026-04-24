import React, { useState } from 'react';
import axios from 'axios';

function ResumeForm({ resumeData, setResumeData }) {
  const [jobRole, setJobRole] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const generateSummary = async () => {
    if (!jobRole) return alert('Please enter a job role!');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/generate-summary', { jobRole });
      setResumeData({ ...resumeData, summary: res.data.summary });
    } catch (err) {
      alert('Failed to generate summary!');
    }
    setLoading(false);
  };

  return (
    <div className="form-panel">
      <h2>📝 Your Details</h2>

      <div className="form-group">
        <label>Full Name</label>
        <input name="name" placeholder="John Doe" value={resumeData.name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input name="email" placeholder="john@email.com" value={resumeData.email} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input name="phone" placeholder="+91 9876543210" value={resumeData.phone} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>LinkedIn</label>
        <input name="linkedin" placeholder="linkedin.com/in/johndoe" value={resumeData.linkedin} onChange={handleChange} />
      </div>

      <div className="ai-box">
        <h3>🤖 AI Summary Generator</h3>
        <div className="form-group">
          <input
            placeholder="Enter job role (e.g. Web Developer)"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
          />
        </div>
        <button className="ai-btn" onClick={generateSummary} disabled={loading}>
          {loading ? '⏳ Generating...' : '✨ Generate with AI'}
        </button>
      </div>

      <div className="form-group">
        <label>Professional Summary</label>
        <textarea name="summary" placeholder="Your summary..." value={resumeData.summary} onChange={handleChange} style={{height: '80px'}} />
      </div>
      <div className="form-group">
        <label>Skills</label>
        <textarea name="skills" placeholder="React, Node.js, MongoDB..." value={resumeData.skills} onChange={handleChange} style={{height: '70px'}} />
      </div>
      <div className="form-group">
        <label>Experience</label>
        <textarea name="experience" placeholder="Company | Role | Duration..." value={resumeData.experience} onChange={handleChange} style={{height: '90px'}} />
      </div>
      <div className="form-group">
        <label>Education</label>
        <textarea name="education" placeholder="Degree | College | Year..." value={resumeData.education} onChange={handleChange} style={{height: '70px'}} />
      </div>
    </div>
  );
}

export default ResumeForm;