import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'privacyPolicy',
  title: 'Privacy Policy',
  type: 'document',
  fields: [
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated Text',
      type: 'string',
      initialValue: 'August 2026',
    }),
    defineField({
      name: 'sections',
      title: 'Policy Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'policySection',
          title: 'Policy Section',
          fields: [
            { name: 'title', title: 'Section Title', type: 'string' },
            { name: 'content', title: 'Section Content', type: 'text' },
            {
              name: 'items',
              title: 'Bullet Points (Optional)',
              type: 'array',
              of: [{ type: 'string' }],
            },
            {
              name: 'icon',
              title: 'Icon Name (Optional)',
              type: 'string',
              description: 'Name of Lucide icon (e.g. lock, shield, file-text)',
            },
          ],
        },
      ],
    }),
  ],
});
