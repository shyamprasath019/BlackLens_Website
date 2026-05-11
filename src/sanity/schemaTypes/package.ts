import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'package',
  title: 'Package',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'price', title: 'Price', type: 'string' }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'popular',
      title: 'Popular',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
 