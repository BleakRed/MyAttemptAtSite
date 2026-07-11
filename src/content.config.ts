import { defineCollection, z } from 'astro:content';

const links = defineCollection({
	type: 'data',
	schema: z.object({
		title: z.string(),
		url: z.string().url(),
		description: z.string(),
		category: z.enum(['social', 'dev', 'media', 'tools']),
		icon: z.string().default('🔗'),
		featured: z.boolean().default(false),
	}),
});

export const collections = { links };