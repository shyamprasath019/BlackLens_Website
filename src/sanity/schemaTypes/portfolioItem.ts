import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'portfolioItem',
  title: 'Portfolio Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category (Service)',
      type: 'reference',
      to: [{ type: 'service' }],
      description: 'Select the service category this portfolio item belongs to.',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'If checked, this item will appear in the "Featured Work" section on the Home Page.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
});
