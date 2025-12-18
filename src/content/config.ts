import { defineCollection, z } from 'astro:content';

const blogsCollection = defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      datetime: z.string(),
      image: z.string().optional(),
    }),

});

const notesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    datetime: z.string().or(z.date()),
    type: z.enum(['technical', 'personal', 'learning', 'linkedin']).optional(),
    tags: z.array(z.string()).optional(),
  }),
});


export const collections = {
  'blogs': blogsCollection,
  'notes': notesCollection
};


