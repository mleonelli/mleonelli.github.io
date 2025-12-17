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
    // Optional: add type field if you want to differentiate note types
    type: z.enum(['technical', 'personal', 'learning']).optional(),
  }),
});


export const collections = {
  'blogs': blogsCollection,
  'notes': notesCollection
};


