export const getCategoryQuery = /* GraphQL */ `
  query getCategory($entityId: Int!) {
    site {
      category(entityId: $entityId) {
        entityId
        name
        path
        description
        seo {
          metaDescription
          metaKeywords
          pageTitle
        }
      }
    }
  }
`;

export const getStoreCategoriesQuery = /* GraphQL */ `
  query getStoreCategories {
    site {
      categoryTree {
        name
        productCount
        description
        entityId
        path
        image {
          altText
          urlOriginal
        }
      }
    }
  }
`;
export const getCategoryTreeQuery = /* GraphQL */ `
  query MyQuery {
    site {
      categoryTree {
        description
        entityId
        hasChildren
        path
        productCount
        name
      }
    }
  }
`;
