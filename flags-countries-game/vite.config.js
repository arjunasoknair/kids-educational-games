import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/flags-countries-game/',
  plugins: [react()],
}); 