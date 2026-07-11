import { defineConfig } from 'astro/config';
import yaml from '@modyfi/vite-plugin-yaml';

export default defineConfig({
	contentDir: 'content',
	vite: {
		plugins: [yaml()],
	},
});