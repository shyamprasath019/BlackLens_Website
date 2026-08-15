import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'primaryColor',
      title: 'Primary Brand Color',
      type: 'string',
      description: 'Hex color code for the site accent color (e.g. #D4AF37 for gold, #C9866A for rose gold, #E8A0B4 for pink). Changes take effect on next page load.',
      placeholder: '#D4AF37',
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/).warning(
          'Must be a valid hex color (e.g. #D4AF37)'
        ),
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
      name: 'showTeamSection',
      title: 'Show Team Section',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to turn on and off the Meet Our Team section on the About Page.',
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Google Maps Embed URL / IFrame Code',
      type: 'text',
      description: 'You can paste the entire Google Maps iframe embed code block, or just the URL from its src attribute (e.g., https://www.google.com/maps/embed?pb=...).',
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

