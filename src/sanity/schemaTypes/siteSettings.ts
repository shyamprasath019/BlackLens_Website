import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'primaryColor',
      title: 'Primary Brand Color',
      type: 'color',
      description: 'The main accent color used across the entire website (buttons, highlights, borders). Default: Gold #D4AF37. Changes take effect on next page load.',
      options: {
        disableAlpha: true,
      },
    }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'address', title: 'Address', type: 'text' }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'string',
    }),
    defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
    defineField({ name: 'youtube', title: 'YouTube URL', type: 'url' }),
    defineField({ name: 'whatsapp', title: 'WhatsApp Number', type: 'string' }),
    defineField({
      name: 'showPortfolioCategories',
      title: 'Show Portfolio Categories',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'text',
      description: 'The src URL from Google Maps Embed iframe code (e.g. https://www.google.com/maps/embed?pb=...)',
    }),
    defineField({
      name: 'locationsCovered',
      title: 'Locations / Cities Covered',
      type: 'array',
      description: 'List of cities or regions covered for photography shoots (e.g. Chennai, Coimbatore, Madurai...)',
      of: [{ type: 'string' }],
    }),
  ],
});

