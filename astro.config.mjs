import { defineConfig } from 'astro/config';
import yaml from '@modyfi/vite-plugin-yaml';

export default defineConfig({
	site: 'https://bleakred.github.io',
	base: '/MyAttemptAtSite',
	contentDir: 'content',
	vite: {
		plugins: [yaml()],
	},
});