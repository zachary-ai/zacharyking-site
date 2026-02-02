import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    author: z.string().default('Zachary King'),
    slug: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
};
