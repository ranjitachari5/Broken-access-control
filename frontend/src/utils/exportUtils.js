import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Export JSON/Array dataset to CSV file
export const exportToCSV = (data, filename = 'audit_logs.csv') => {
  if (!data || !data.length) return;

  const headers = Object.keys(data[0]);
  const csvRows = [];

  // Add header row
  csvRows.push(headers.join(','));

  // Add data rows
  for (const row of data) {
    const values = headers.map((header) => {
      const escaped = ('' + (row[header] ?? '')).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Export dataset to PDF file
export const exportToPDF = (title, columns, data, filename = 'security_report.pdf') => {
  const doc = new jsPDF();

  // Document Title & Header
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.text(title, 14, 20);

  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`Generated on: ${new Date().toLocaleString()} | Policy-Driven Authorization Platform`, 14, 28);
  doc.text(`Framework: Broken Access Control Prevention System`, 14, 34);

  // Table
  const tableRows = data.map((item) => columns.map((col) => item[col.key] || ''));
  const tableHeaders = columns.map((col) => col.header);

  doc.autoTable({
    head: [tableHeaders],
    body: tableRows,
    startY: 40,
    theme: 'grid',
    headStyles: {
      fillColor: [17, 24, 39],
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [51, 65, 85],
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
  });

  doc.save(filename);
};
