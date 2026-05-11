import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'stat',
  title: 'Journey in Numbers (Stat)',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'e.g., Happy Clients, Photos Captured',
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'e.g., 500+, 50K+',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'value',
    },
  },
});
