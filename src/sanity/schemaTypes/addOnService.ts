import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'addOnService',
  title: 'Add-On Service',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Service Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price / Rate',
      type: 'string',
      description: 'e.g. ₹8,000 or ₹500 (per item)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
});
