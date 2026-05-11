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
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Weddings', value: 'weddings' },
          { title: 'Portraits', value: 'portraits' },
          { title: 'Fashion', value: 'fashion' },
          { title: 'Product', value: 'product' },
          { title: 'Corporate', value: 'corporate' },
          { title: 'Cinematography', value: 'cinematography' },
        ],
      },
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
