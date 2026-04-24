import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function ResumePreview({ resumeData, template }) {
  const resumeRef = useRef();

  const downloadPDF = async () => {
    const canvas = await html2canvas(resumeRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${resumeData.name || 'resume'}.pdf`);
  };

  const templates = {
    modern: {
      header: { background: 'linear-gradient(135deg, #1a1a2e, #e94560)', color: 'white', padding: '35px' },
      heading: { color: '#e94560', borderBottom: '2px solid #e94560', paddingBottom: '5px', marginBottom: '10px' }
    },
    classic: {
      header: { background: 'linear-gradient(135deg, #2c3e50, #3498db)', color: 'white', padding: '35px' },
      heading: { color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '5px', marginBottom: '10px' }
    },
    minimal: {
      header: { background: '#f8f9fa', color: '#333', padding: '35px', borderBottom: '4px solid #333' },
      heading: { color: '#333', borderBottom: '1px solid #ddd', paddingBottom: '5px', marginBottom: '10px' }
    }
  };

  const style = templates[template];

  return (
    <div className="preview-panel">
      <button className="download-btn" onClick={downloadPDF}>
        📥 Download Resume as PDF
      </button>

      <div className="resume-box" ref={resumeRef}>
        {/* Header */}
        <div style={style.header}>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>{resumeData.name || 'Your Name'}</h1>
          <p style={{ opacity: 0.85, fontSize: '14px' }}>
            {resumeData.email && `📧 ${resumeData.email}`}
            {resumeData.phone && ` | 📱 ${resumeData.phone}`}
            {resumeData.linkedin && ` | 🔗 ${resumeData.linkedin}`}
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '30px' }}>
          {resumeData.summary && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={style.heading}>Professional Summary</h3>
              <p style={{ lineHeight: '1.7', color: '#444' }}>{resumeData.summary}</p>
            </div>
          )}
          {resumeData.skills && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={style.heading}>Skills</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {resumeData.skills.split(',').map((skill, i) => (
                  <span key={i} style={{
                    background: '#f0f0f0', padding: '4px 12px',
                    borderRadius: '20px', fontSize: '13px', color: '#555'
                  }}>{skill.trim()}</span>
                ))}
              </div>
            </div>
          )}
          {resumeData.experience && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={style.heading}>Experience</h3>
              <p style={{ lineHeight: '1.7', color: '#444', whiteSpace: 'pre-line' }}>{resumeData.experience}</p>
            </div>
          )}
          {resumeData.education && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={style.heading}>Education</h3>
              <p style={{ lineHeight: '1.7', color: '#444', whiteSpace: 'pre-line' }}>{resumeData.education}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;