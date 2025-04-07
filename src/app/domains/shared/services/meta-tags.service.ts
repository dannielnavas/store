import { inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { environment } from '@env/environment';

export interface PageMetaData {
  title: string;
  description: string;
  image: string;
  url: string;
}

const defaultMetaTags: PageMetaData = {
  title: 'Default Title',
  description: 'Default Description',
  image: 'https://example.com/default-image.jpg',
  url: environment.domain,
};

@Injectable({
  providedIn: 'root',
})
export class MetaTagsService {
  titleServices = inject(Title);
  meta = inject(Meta);

  constructor() {}

  updateMetaTags(pageMetaData: Partial<PageMetaData>) {
    const metaData = { ...defaultMetaTags, ...pageMetaData };

    const tags = this.generateMetaTagsDefinitions(metaData);

    tags.forEach(tag => this.meta.updateTag(tag));

    this.titleServices.setTitle(metaData.title);
  }

  private generateMetaTagsDefinitions(
    metaData: PageMetaData
  ): MetaDefinition[] {
    return [
      {
        name: 'description',
        content: metaData.description,
      },
      {
        name: 'title',
        content: metaData.title,
      },
      {
        property: 'og:title',
        content: metaData.title,
      },
      {
        property: 'og:description',
        content: metaData.description,
      },
      {
        property: 'og:image',
        content: metaData.image,
      },
      {
        property: 'og:url',
        content: metaData.url,
      },
      // {
      //   property: 'og:type',
      //   content: 'product',
      // },
    ];
  }
}
