// export type Resource = {
//   id: number;
//   title: string;
//   description: string;
//   category: Category;
//   image: string;
//   slug: string;
//   date: string;
//   author: Author;
//   html: any;
// };

// export type Category = {
//   id: number;
//   name: string;
//   slug: string;
//   image: string;
// };

// export type Author = {
//   id: number;
//   name: string;
//   slug: string;
//   image: string;
// };

// export type Resources = {
//   data: {
//     certifications: Resource[];
//     articles: Resource[];
//     projects: Resource[];
//   };
// };

// export type ResourceData = {
//   data: Resource;
// }

// export type ResourceProps = {
//   data: Resource[];
// };

// export type Resource = {
//   id: number;
//   attributes: ResourceAttributes;
// };

// export type ResourceInner = {
//   id: number;
//   content: string;
//   description: string;
//   cover: Cover;
// };

// export type Resources = {
//   data: {
//     certifications: { data: Resource[] };
//     articles: { data: Resource[] };
//     projects: { data: Resource[] };
//   };
// };

// // export type Resource = {
// //   id: number;
// //   attributes: ResourceAttributes;
// // };

// export type ResourceAttributes = {
//   title: string;
//   slug: string;
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
//   resource: {
//     id: number;
//     content: string;
//     description: string;
//     cover: string;
//     coverAltText: string;
//     external: string;
//   };
// };

// //Image
// interface ProviderMetadata {
//   public_id: string;
//   resource_type: string;
// }

// interface Format {
//   ext: string;
//   url: string;
//   hash: string;
//   mime: string;
//   name: string;
//   path: null;
//   size: number;
//   width: number;
//   height: number;
//   alternativeText: string;
//   provider_metadata: ProviderMetadata;
// }

// interface Formats {
//   small: Format;
//   medium: Format;
//   thumbnail: Format;
//   [key: string]: Format;
// }

// interface CoverAttributes {
//   name: string;
//   alternativeText: string;
//   caption: string | null;
//   width: number;
//   height: number;
//   formats: Formats;
//   hash: string;
//   ext: string;
//   mime: string;
//   size: number;
//   url: string;
//   previewUrl: string | null;
//   provider: string;
//   provider_metadata: ProviderMetadata;
//   createdAt: string;
//   updatedAt: string;
// }

// interface CoverData {
//   id: number;
//   attributes: CoverAttributes;
// }

// export interface Cover {
//   data: CoverData;
// }

// export interface Covers {
//   data: CoverData[];
// }

type Category = {
  relationTo: string;
  value: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type CategoryResource = {
  category: string;
  resources: Resource[];
};

export interface FullResource {
  docs: Resource[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null;
  nextPage: null;
}

export interface CategoryMap {
  [key: string]: {
    category: string;
    resources: {
      title: string;
      resource: string;
      slug: string;
      createdAt: string;
      shortDescription: string;
      cover: string;
      coverAltText: string;
    }[];
  };
}

export interface Resource {
  id: string;
  title: string;
  cover: string;
  coverAltText: string;
  featured: boolean;
  content: Content;
  category: Category[];
  shortDescription: string;
  resource: string;
  links: [{ link: string; label: string }]; // Replace 'any' with a more specific type if you know the structure of the external links
  slug: string;
  createdAt: string; // or Date if you prefer to work with Date objects
  updatedAt: string; // or Date
  categories: any[]; // Replace 'any' with the specific type of the categories, if known
}

export type HomeResources = {
  article: Resource[];
  certification: Resource[];
  project: Resource[];
};

type TextNode = {
  text: string;
};

type Child = {
  children: TextNode[];
};

type Content = Child[];
