const fs = require('fs');
const results = JSON.parse(fs.readFileSync('accessibility-report.json', 'utf8'));

// Simple HTML report generation
let html = '<h1>Accessibility Report</h1>';

if (results.violations.length === 0) {
  html += '<p>No accessibility issues found.</p>';
} else {
  html += '<ul>';
  results.violations.forEach(v => {
    html += `<li><strong>${v.id}</strong>: ${v.description} - Impact: ${v.impact} - Nodes affected: ${v.nodes.length}</li>`;
  });
  html += '</ul>';
}

fs.writeFileSync('accessibility-report.html', html);
