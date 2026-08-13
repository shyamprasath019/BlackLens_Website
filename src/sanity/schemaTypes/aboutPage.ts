import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: 'About Page Settings',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'storyTitle', title: 'Story Title', type: 'string' }),
    defineField({
      name: 'storyParagraphs',
      title: 'Story Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({ name: 'storyImage', title: 'Story Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'visionText', title: 'Vision Statement', type: 'text' }),
    defineField({ name: 'missionText', title: 'Mission Statement', type: 'text' }),
  ],
});
