import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'portfolioItem',
  title: 'Portfolio Item',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Wedding', value: 'wedding' },
          { title: 'Portrait', value: 'portrait' },
          { title: 'Fashion', value: 'fashion' },
          { title: 'Product', value: 'product' },
          { title: 'Corporate', value: 'corporate' },
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
  ],
});
