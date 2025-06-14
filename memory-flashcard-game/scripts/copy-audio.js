import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define topics and their audio directories
const TOPICS = {
  animals: 'animals',
  body_parts: 'body_parts',
  colors: 'colors',
  numbers: 'numbers'
};

// Map number filenames to their word equivalents
const numberMap = {
  'numbers_000': 'numbers_zero',
  'numbers_001': 'numbers_one',
  'numbers_002': 'numbers_two',
  'numbers_003': 'numbers_three',
  'numbers_004': 'numbers_four',
  'numbers_005': 'numbers_five',
  'numbers_006': 'numbers_six',
  'numbers_007': 'numbers_seven',
  'numbers_008': 'numbers_eight',
  'numbers_009': 'numbers_nine',
  'numbers_010': 'numbers_ten',
  'numbers_011': 'numbers_eleven',
  'numbers_012': 'numbers_twelve',
  'numbers_013': 'numbers_thirteen',
  'numbers_014': 'numbers_fourteen',
  'numbers_015': 'numbers_fifteen',
  'numbers_016': 'numbers_sixteen',
  'numbers_017': 'numbers_seventeen',
  'numbers_018': 'numbers_eighteen',
  'numbers_019': 'numbers_nineteen',
  'numbers_020': 'numbers_twenty'
};

// Create audio directories in public
const publicAudioDir = path.join(__dirname, '../public/audio_assets');
const languages = ['en', 'ml'];

// Create base directories
[publicAudioDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Copy audio files for each topic and language
Object.entries(TOPICS).forEach(([topic, audioDir]) => {
  languages.forEach(lang => {
    const sourceDir = path.join(__dirname, `../../shared/audio_assets/${lang}/${audioDir}`);
    const targetDir = path.join(publicAudioDir, `${lang}/${audioDir}`);
    
    // Create target directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Copy audio files
    if (fs.existsSync(sourceDir)) {
      fs.readdirSync(sourceDir).forEach(file => {
        if (file.endsWith('.wav')) {
          let targetFile = file;
          
          // Rename number files
          if (topic === 'numbers') {
            const baseName = file.replace(`_${lang}.wav`, '');
            if (numberMap[baseName]) {
              targetFile = `${numberMap[baseName]}_${lang}.wav`;
            }
          }
          
          fs.copyFileSync(
            path.join(sourceDir, file),
            path.join(targetDir, targetFile)
          );
        }
      });
    }
  });
});

console.log('Audio files copied successfully!'); 