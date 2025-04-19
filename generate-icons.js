const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Define icon sizes needed for Android
const iconSizes = [
  { size: 48, name: 'mdpi' },
  { size: 72, name: 'hdpi' },
  { size: 96, name: 'xhdpi' },
  { size: 144, name: 'xxhdpi' },
  { size: 192, name: 'xxxhdpi' },
  { size: 512, name: 'playstore' }
];

// Source SVG icon
const sourceIcon = path.join(__dirname, 'public', 'icons', 'app-icon.svg');

// Output directory
const outputDir = path.join(__dirname, 'public', 'icons', 'android');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate icons for each size
async function generateIcons() {
  try {
    for (const { size, name } of iconSizes) {
      const outputFile = path.join(outputDir, `icon-${name}.png`);
      
      await sharp(sourceIcon)
        .resize(size, size)
        .png()
        .toFile(outputFile);
      
      console.log(`Generated ${outputFile} (${size}x${size})`);
    }
    
    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
