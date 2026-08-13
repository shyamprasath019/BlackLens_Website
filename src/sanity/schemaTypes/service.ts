import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      description: 'If checked, this service will be highlighted on the main Home Page.',
      initialValue: false,
    }),
    defineField({
      name: 'icon',
      title: 'Service Icon',
      type: 'string',
      description: 'Select an icon for this service (displayed on Homepage and Services Page)',
      options: {
        list: [
          { title: 'Camera (Default / Studio)', value: 'camera' },
          { title: 'Utensils (Food & Culinary)', value: 'utensils' },
          { title: 'Heart (Wedding & Event)', value: 'heart' },
          { title: 'Film (Cinematography & Reels)', value: 'film' },
          { title: 'Users (Portraits / Fashion / Team)', value: 'users' },
          { title: 'Shopping Bag (Product Photography)', value: 'shopping-bag' },
          { title: 'Shirt (Fashion Photography)', value: 'shirt' },
          { title: 'Briefcase (Corporate Headshots)', value: 'briefcase' },
          { title: 'Baby (Family & Maternity)', value: 'baby' },
          { title: 'Gift (Birthday & Celebrations)', value: 'gift' },
          { title: 'Award (Commercial Shoots)', value: 'award' },
          { title: 'Video (Video & Shorts)', value: 'video' },
          { title: 'Star (Highlight / Special)', value: 'star' },
        ],
      },
      initialValue: 'camera',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order number for sorting services on the Services page and Homepage (e.g. 1, 2, 3...)',
      initialValue: 0,
    }),
  ],
});
