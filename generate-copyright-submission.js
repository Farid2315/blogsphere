const fs = require('fs');
const path = require('path');

// List of all source files to process
const sourceFiles = [
  'src\\utils\\reverseGeocodeOSM.ts',
  'src\\utils\\geocoding.ts',
  'src\\utils\\distance.ts',
  'src\\utils\\coordinate-converter.ts',
  'src\\hooks\\use-mobile.ts',
  'src\\hooks\\use-geolocation.ts',
  'src\\hooks\\use-auth.ts',
  'src\\components\\location-permission.tsx',
  'src\\components\\LocationButton.tsx',
  'src\\components\\header.tsx',
  'src\\lib\\utils.ts',
  'src\\components\\fashion-grid.tsx',
  'src\\components\\restaurant-detail.tsx',
  'src\\components\\fashion-detail.tsx',
  'src\\components\\AddressDisplay.tsx',
  'src\\lib\\theme.tsx',
  'src\\lib\\prisma.ts',
  'src\\lib\\db.ts',
  'src\\lib\\auth.ts',
  'src\\lib\\auth-client.ts',
  'src\\components\\tech-grid.tsx',
  'src\\components\\tech-detail.tsx',
  'src\\components\\sidebar.tsx',
  'src\\components\\restaurant-grid.tsx',
  'src\\components\\theme-toggle.tsx',
  'src\\components\\theme-provider.tsx',
  'src\\components\\layout\\app-layout.tsx',
  'src\\app\\signup\\page.tsx',
  'src\\app\\page.tsx',
  'src\\components\\promotion\\OfferRow.tsx',
  'src\\app\\_comps\\landing-page.tsx',
  'src\\components\\ui\\accordion.tsx',
  'src\\components\\ui\\chart.tsx',
  'src\\components\\ui\\checkbox.tsx',
  'src\\components\\ui\\carousel.tsx',
  'src\\components\\ui\\card.tsx',
  'src\\components\\ui\\calendar.tsx',
  'src\\components\\ui\\button.tsx',
  'src\\components\\ui\\breadcrumb.tsx',
  'src\\components\\ui\\badge.tsx',
  'src\\components\\ui\\avatar.tsx',
  'src\\components\\ui\\aspect-ratio.tsx',
  'src\\components\\ui\\alert.tsx',
  'src\\components\\ui\\alert-dialog.tsx',
  'src\\components\\promotion\\ImageListInput.tsx',
  'src\\components\\promotion\\BranchRow.tsx',
  'src\\app\\login\\page.tsx',
  'src\\components\\ui\\collapsible.tsx',
  'src\\app\\layout.tsx',
  'src\\components\\ui\\command.tsx',
  'src\\app\\promotions\\create\\page.tsx',
  'src\\app\\api\\test-auth\\route.ts',
  'src\\app\\api\\test-env\\route.ts',
  'src\\app\\(dashboard)\\page.tsx',
  'src\\app\\api\\test-google\\route.ts',
  'src\\app\\api\\test-db\\route.ts',
  'src\\app\\api\\users\\route.ts',
  'src\\app\\(dashboard)\\tech\\page.tsx',
  'src\\app\\(dashboard)\\restaurants\\page.tsx',
  'src\\app\\api\\test-connection\\route.ts',
  'src\\app\\(dashboard)\\music\\page.tsx',
  'src\\app\\(dashboard)\\music\\[id]\\page.tsx',
  'src\\app\\(dashboard)\\tech\\_comps\\tech-grid.tsx',
  'src\\app\\(dashboard)\\tech\\_comps\\tech-detail.tsx',
  'src\\app\\api\\users\\location\\route.ts',
  'src\\app\\(dashboard)\\fashion\\page.tsx',
  'src\\app\\(dashboard)\\music\\_comps\\music-grid.tsx',
  'src\\app\\(dashboard)\\music\\_comps\\music-detail.tsx',
  'src\\app\\(dashboard)\\restaurants\\[id]\\page.tsx',
  'src\\app\\(dashboard)\\travel\\page.tsx',
  'src\\app\\(dashboard)\\gaming\\page.tsx',
  'src\\app\\(dashboard)\\profile\\page.tsx',
  'src\\app\\(dashboard)\\fashion\\_comps\\fashion-grid.tsx',
  'src\\app\\(dashboard)\\fashion\\_comps\\fashion-detail.tsx',
  'src\\app\\(dashboard)\\gaming\\_comps\\gaming-grid.tsx',
  'src\\app\\(dashboard)\\gaming\\_comps\\gaming-detail.tsx',
  'src\\app\\(dashboard)\\profile\\_comps\\profile-content.tsx',
  'src\\app\\(dashboard)\\[profile]\\page.tsx',
  'src\\app\\(dashboard)\\fashion\\[id]\\page.tsx',
  'src\\app\\(dashboard)\\gaming\\[id]\\page.tsx',
  'src\\app\\(dashboard)\\profile\\[profile]\\_comps\\all-posts-content.tsx',
  'src\\app\\(dashboard)\\travel\\[id]\\page.tsx',
  'src\\components\\ui\\tooltip.tsx',
  'src\\app\\(dashboard)\\travel\\_comps\\travel-detail.tsx',
  'src\\components\\ui\\toggle.tsx',
  'src\\components\\ui\\toggle-group.tsx',
  'src\\components\\ui\\textarea.tsx',
  'src\\components\\ui\\tabs.tsx',
  'src\\app\\(dashboard)\\[profile]\\_comps\\all-posts-content.tsx',
  'src\\app\\(dashboard)\\travel\\_comps\\travel-grid.tsx',
  'src\\components\\ui\\table.tsx',
  'src\\components\\ui\\switch.tsx',
  'src\\app\\api\\users\\[id]\\route.ts',
  'src\\app\\api\\restaurants\\route.ts',
  'src\\app\\(dashboard)\\restaurants\\_comps\\restaurant-grid.tsx',
  'src\\app\\(dashboard)\\create-promotion\\page.tsx',
  'src\\app\\(dashboard)\\restaurants\\_comps\\restaurant-detail.tsx',
  'src\\app\\api\\posts\\route.ts',
  'src\\app\\api\\convert-coordinates\\route.ts',
  'src\\app\\api\\profile\\route.ts',
  'src\\components\\ui\\sonner.tsx',
  'src\\components\\ui\\slider.tsx',
  'src\\components\\ui\\skeleton.tsx',
  'src\\components\\ui\\sidebar.tsx',
  'src\\components\\ui\\sheet.tsx',
  'src\\components\\ui\\separator.tsx',
  'src\\components\\ui\\select.tsx',
  'src\\components\\ui\\scroll-area.tsx',
  'src\\components\\ui\\resizable.tsx',
  'src\\components\\ui\\radio-group.tsx',
  'src\\components\\ui\\progress.tsx',
  'src\\components\\ui\\popover.tsx',
  'src\\components\\ui\\pagination.tsx',
  'src\\components\\ui\\navigation-menu.tsx',
  'src\\components\\ui\\menubar.tsx',
  'src\\components\\ui\\label.tsx',
  'src\\components\\ui\\input.tsx',
  'src\\components\\ui\\input-otp.tsx',
  'src\\components\\ui\\hover-card.tsx',
  'src\\components\\ui\\form.tsx',
  'src\\components\\ui\\dropdown-menu.tsx',
  'src\\components\\ui\\drawer.tsx',
  'src\\components\\ui\\dialog.tsx',
  'src\\components\\ui\\context-menu.tsx',
  'src\\app\\(dashboard)\\tech\\[id]\\page.tsx',
  'src\\app\\api\\fashion\\route.ts',
  'src\\app\\(dashboard)\\create-promotion\\_comps\\create.tsx',
  'src\\app\\api\\restaurants\\[id]\\route.ts',
  'src\\app\\api\\posts\\create\\route.ts',
  'src\\app\\api\\posts\\nearby\\route.ts',
  'src\\app\\api\\fashion\\[id]\\route.ts',
  'src\\app\\api\\posts\\user\\[userId]\\route.ts',
  'src\\app\\api\\posts\\[id]\\comment\\route.ts',
  'src\\app\\api\\auth\\[...all]\\route.ts',
];

// Sensitive patterns to redact
const sensitivePatterns = [
  /mongodb\+srv:\/\/[^\s'"]+/gi,
  /postgres:\/\/[^\s'"]+/gi,
  /mysql:\/\/[^\s'"]+/gi,
  /API[_-]?KEY["\s:=]+[^\s'"]+/gi,
  /SECRET[_-]?KEY["\s:=]+[^\s'"]+/gi,
  /PASSWORD["\s:=]+[^\s'"]+/gi,
  /GOOGLE[_-]?CLIENT[_-]?SECRET["\s:=]+[^\s'"]+/gi,
  /NEXTAUTH[_-]?SECRET["\s:=]+[^\s'"]+/gi,
  /DATABASE[_-]?URL["\s:=]+["'][^'"]+["']/gi,
];

function redactSensitiveInfo(content) {
  let redacted = content;
  sensitivePatterns.forEach(pattern => {
    redacted = redacted.replace(pattern, '[REDACTED]');
  });
  return redacted;
}

function extractFirstAndLastLines(filePath) {
  try {
    const fullPath = path.join(__dirname, filePath);
    
    if (!fs.existsSync(fullPath)) {
      return `File not found: ${filePath}\n\n`;
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split('\n');
    const totalLines = lines.length;

    let output = '';
    output += '='.repeat(80) + '\n';
    output += `FILE: ${filePath}\n`;
    output += `Total Lines: ${totalLines}\n`;
    output += '='.repeat(80) + '\n\n';

    if (totalLines <= 100) {
      // If file has 100 or fewer lines, include everything
      output += '// ----- COMPLETE FILE (≤100 lines) -----\n\n';
      output += redactSensitiveInfo(content);
      output += '\n\n';
    } else {
      // Extract first 50 lines
      output += '// ----- FIRST 50 LINES -----\n\n';
      const firstLines = lines.slice(0, 50).join('\n');
      output += redactSensitiveInfo(firstLines);
      output += '\n\n';

      output += '// ----- END OF FIRST 10 PAGES -----\n';
      output += '// ... (Lines 51 to ' + (totalLines - 50) + ' omitted for brevity) ...\n';
      output += '// ----- START OF LAST 10 PAGES -----\n\n';

      // Extract last 50 lines
      output += '// ----- LAST 50 LINES -----\n\n';
      const lastLines = lines.slice(-50).join('\n');
      output += redactSensitiveInfo(lastLines);
      output += '\n\n';
    }

    return output;
  } catch (error) {
    return `Error processing ${filePath}: ${error.message}\n\n`;
  }
}

// Generate the copyright submission document
console.log('Generating copyright submission document...');
console.log(`Processing ${sourceFiles.length} files...`);

let output = '';
output += '################################################################################\n';
output += '#                                                                              #\n';
output += '#                    COPYRIGHT SUBMISSION DOCUMENT                            #\n';
output += '#                                                                              #\n';
output += '#                         Project: BlogSphere                                 #\n';
output += '#                                                                              #\n';
output += '#  This document contains source code excerpts for copyright registration.    #\n';
output += '#  Each file includes the first 50 and last 50 lines of code.                #\n';
output += '#  Sensitive information (API keys, passwords, etc.) has been redacted.      #\n';
output += '#                                                                              #\n';
output += `#  Generated: ${new Date().toISOString()}                                    #\n`;
output += `#  Total Files: ${sourceFiles.length}                                                         #\n`;
output += '#                                                                              #\n';
output += '################################################################################\n\n\n';

// Remove duplicates from file list
const uniqueFiles = [...new Set(sourceFiles)];
console.log(`Processing ${uniqueFiles.length} unique files...`);

let processedCount = 0;
uniqueFiles.forEach((file, index) => {
  output += extractFirstAndLastLines(file);
  processedCount++;
  
  if ((index + 1) % 20 === 0) {
    console.log(`Processed ${index + 1}/${uniqueFiles.length} files...`);
  }
});

output += '\n\n';
output += '################################################################################\n';
output += '#                         END OF COPYRIGHT SUBMISSION                         #\n';
output += '################################################################################\n';

// Write to file
const outputPath = path.join(__dirname, 'COPYRIGHT_SUBMISSION.txt');
fs.writeFileSync(outputPath, output, 'utf8');

console.log(`\nSuccess! Processed ${processedCount} files.`);
console.log(`Output saved to: ${outputPath}`);
console.log(`File size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`);
