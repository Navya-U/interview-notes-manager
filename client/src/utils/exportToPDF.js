import jsPDF from 'jspdf';

export const exportNotesAsTextPDF = (notes, title = 'My Notes') => {
  const doc = new jsPDF();

  const margin = 10;
  const lineHeight = 10;
  const pageHeight = doc.internal.pageSize.height;
  let y = margin;

  doc.setFontSize(16);
  doc.text(title, margin, y);
  y += lineHeight * 2;

  doc.setFontSize(12);

  notes.forEach((note, index) => {
    const { title, content, tags = [], category } = note;

    const lines = [
      `#${index + 1} - ${title}`,
      `Category: ${category || 'None'}`,
      `Tags:${tags.join(', ') || 'None'}`,
      'Content:',
      ...doc.splitTextToSize(content, 180),
      '---------------------------------------------',
    ];

    lines.forEach((line) => {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }

      doc.text(line, margin, y);
      y += lineHeight;
    });

    y += lineHeight;
  });

  doc.save('notes.pdf');
};
