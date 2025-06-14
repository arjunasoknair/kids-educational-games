import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create audio directories in public
const publicAudioDir = path.join(__dirname, '../public/audio_assets');
const enAudioDir = path.join(publicAudioDir, 'en/animals');
const mlAudioDir = path.join(publicAudioDir, 'ml/animals');

// Create directories if they don't exist
[publicAudioDir, enAudioDir, mlAudioDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Copy English audio files
const enSourceDir = path.join(__dirname, '../../shared/audio_assets/en/animals');
fs.readdirSync(enSourceDir).forEach(file => {
  if (file.endsWith('.wav')) {
    fs.copyFileSync(
      path.join(enSourceDir, file),
      path.join(enAudioDir, file)
    );
  }
});

// Copy Malayalam audio files
const mlSourceDir = path.join(__dirname, '../../shared/audio_assets/ml/animals');
fs.readdirSync(mlSourceDir).forEach(file => {
  if (file.endsWith('.wav')) {
    fs.copyFileSync(
      path.join(mlSourceDir, file),
      path.join(mlAudioDir, file)
    );
  }
});

console.log('Audio files copied successfully!'); 