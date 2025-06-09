'use client';

import { useState } from 'react';
import { X, Printer, Download } from 'lucide-react';
import { Athlete } from '@/data/athletes';
import { SuggestedAthlete } from '@/data/suggestedAthletes';

type AthleteType = Athlete | SuggestedAthlete;

interface PrintPreviewProps {
  athlete: AthleteType;
  onClose: () => void;
}

export default function PrintPreview({ athlete, onClose }: PrintPreviewProps) {
  const [includeQuiz, setIncludeQuiz] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    // We'll implement PDF generation here
    try {
      const jsPDF = (await import('jspdf')).default;
      const doc = new jsPDF();
      
      // Set up the document
      doc.setFontSize(18);
      doc.text(athlete.name, 105, 20, { align: 'center' });
      
      doc.setFontSize(14);
      doc.text(`${athlete.sport} Player`, 105, 30, { align: 'center' });
      
      // Add a line separator
      doc.line(20, 35, 190, 35);
      
      // Add the story content
      doc.setFontSize(12);
      const splitStory = doc.splitTextToSize(athlete.story, 170);
      doc.text(splitStory, 20, 45);
      
      let yPosition = 45 + (splitStory.length * 5) + 20;
      
      // Add quiz questions if selected
      if (includeQuiz && athlete.questions.length > 0) {
        // Check if we need a new page
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.setFontSize(16);
        doc.text('Quiz Questions', 105, yPosition, { align: 'center' });
        yPosition += 15;
        
        doc.line(20, yPosition, 190, yPosition);
        yPosition += 10;
        
        athlete.questions.forEach((question, index) => {
          // Check if we need a new page for this question
          if (yPosition > 240) {
            doc.addPage();
            yPosition = 20;
          }
          
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`${index + 1}. ${question.question}`, 20, yPosition);
        yPosition += 8;
        
        doc.setFont('helvetica', 'normal');
          question.options.forEach((option, optIndex) => {
            const letter = String.fromCharCode(65 + optIndex); // A, B, C, D
            doc.text(`   ${letter}. ${option}`, 25, yPosition);
            yPosition += 6;
          });
          
          yPosition += 5; // Extra space between questions
        });
      }
      
      // Add footer
      const pageCount = (doc as unknown as { internal: { getNumberOfPages: () => number } }).internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(`Sports Heroes Reading App - Page ${i} of ${pageCount}`, 105, 285, { align: 'center' });
      }
      
      // Save the PDF
      doc.save(`${athlete.name.replace(/\s+/g, '_')}_Story.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-dark-card rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-dark">
          <h2 className="text-xl font-bold text-white">Print Preview</h2>
          <button
            onClick={onClose}
            className="text-secondary hover:text-white p-2 rounded-lg hover:bg-smokey-gray"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls */}
        <div className="p-4 border-b border-dark bg-smokey-gray">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-white">
                <input
                  type="checkbox"
                  checked={includeQuiz}
                  onChange={(e) => setIncludeQuiz(e.target.checked)}
                  className="rounded border-dark bg-smokey-gray text-tennessee-orange focus:ring-tennessee-orange"
                />
                Include Quiz Questions
              </label>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-tennessee-orange hover:bg-tennessee-orange-dark text-white rounded-lg transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] bg-white text-black">
          {/* Print Header */}
          <div className="print-story-header">
            <div className="print-story-title">{athlete.name}</div>
            <div className="print-story-subtitle">{athlete.sport} Player</div>
          </div>

          {/* Athlete Image */}
          <div className="print-athlete-image">{athlete.image}</div>

          {/* Story Content */}
          <div className="print-story-content">
            {athlete.story.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Quiz Section */}
          {includeQuiz && athlete.questions.length > 0 && (
            <div className="print-quiz-section">
              <div className="print-quiz-header">Quiz Questions</div>
              
              {athlete.questions.map((question, index) => (
                <div key={index} className="print-question">
                  <div className="print-question-number">Question {index + 1}</div>
                  <div className="print-question-text">{question.question}</div>
                  
                  <div className="print-options">
                    {question.options.map((option, optIndex) => {
                      const letter = String.fromCharCode(65 + optIndex); // A, B, C, D
                      return (
                        <div key={optIndex} className="print-option">
                          {letter}. {option}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Print Footer */}
          <div className="print-footer">
            Sports Heroes Reading App - Printed on {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
