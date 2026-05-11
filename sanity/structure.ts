import { StructureBuilder } from 'sanity/structure';

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Content Group
      S.listItem()
        .title('📸 Portfolio')
        .child(S.documentTypeList('portfolioItem').title('Portfolio Items')),
      S.listItem()
        .title('💬 Testimonials')
        .child(S.documentTypeList('testimonial').title('Testimonials')),
      S.listItem()
        .title('💰 Packages')
        .child(S.documentTypeList('package').title('Service Packages')),
      S.divider(),
      
      // Configuration Group
      S.listItem()
        .title('🛠️ Services')
        .child(S.documentTypeList('service').title('Services')),
      S.listItem()
        .title('📈 Journey in Numbers')
        .child(S.documentTypeList('stat').title('Statistics')),
      S.divider(),
      
      // Singletons
      S.listItem()
        .title('🏠 Home Page Content')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
        ),
      S.listItem()
        .title('⚙️ Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      
      // Filter out types that are already handled as singletons
      ...S.documentTypeListItems().filter(
        (listItem) => !['homePage', 'siteSettings', 'portfolioItem', 'testimonial', 'package', 'service', 'stat'].includes(listItem.getId()!)
      ),
    ]);
