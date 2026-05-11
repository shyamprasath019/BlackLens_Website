import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string' }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'heroCTA',
      title: 'Hero CTA Text',
      type: 'string',
    }),
  ],
});
