import { productFragment } from '../fragments/product';
export const getProductQuery = /* GraphQL */ `
  query productById($productId: ID!) {
    site {
      product(id: $productId) {
        ...product
      }
    }
  }
  ${productFragment}
`;

export const getStoreProductsQuery = /* GraphQL */ `
  query getStoreProducts($entityIds: [Int!]) {
    site {
      products(entityIds: $entityIds, first: 50) {
        edges {
          node {
            ...product
          }
        }
      }
    }
  }
  ${productFragment}
`;

export const getProductsCollectionQuery = /* GraphQL */ `
  query getProductsCollection($entityId: Int!, $sortBy: CategoryProductSort, $hideOutOfStock: Boolean, $first: Int) {
    site {
      category(entityId: $entityId) {
        products(sortBy: $sortBy, hideOutOfStock: $hideOutOfStock, first: $first) {
          edges {
            node {
              ...product
            }
          }
        }
      }
    }
  }
  ${productFragment}
`;

export const searchProductsQuery = /* GraphQL */ `
  query searchProducts($filters: SearchProductsFiltersInput!, $sort: SearchProductsSortInput) {
    site {
      search {
        searchProducts(filters: $filters, sort: $sort) {
          products {
            edges {
              node {
                ...product
              }
            }
          }
        }
      }
    }
  }
  ${productFragment}
`;

export const getProductsRecommedationsQuery = /* GraphQL */ `
  query getProductsRecommedations($productId: ID) {
    site {
      product(id: $productId) {
        relatedProducts {
          edges {
            node {
              ...product
            }
          }
        }
      }
    }
  }
  ${productFragment}
`;

export const getNewestProductsQuery = /* GraphQL */ `
  query getNewestProducts($first: Int) {
    site {
      newestProducts(first: $first) {
        edges {
          node {
            ...product
          }
        }
      }
    }
  }
  ${productFragment}
`;

export const getFeaturedProductsQuery = /* GraphQL */ `
  query getFeaturedProducts($first: Int) {
    site {
      featuredProducts(first: $first) {
        edges {
          node {
            ...product
          }
        }
      }
    }
  }
  ${productFragment}
`;

export const getPopularProductsQuery = /* GraphQL */ `
  query bestSellingProducts($first: Int) {
    site {
      bestSellingProducts(first: $first) {
        edges {
          node {
            ...product
          }
        }
      }
    }
  }
  ${productFragment}
`;

export const getCategoryProductsQuery = /* GraphQL */ `
  query categoryProducts($entityId: Int!) {
    site {
      category(entityId: $entityId) {
        id
        entityId
        name
        path
        description
        defaultImage {
          url(height: 10, width: 10)
          altText
        }
        seo {
          metaDescription
          metaKeywords
          pageTitle
        }
        products {
          edges {
            node {
              id
              addToCartUrl
              availabilityV2 {
                status
              }
              description
              images {
                edges {
                  node {
                    altText
                    url(width: 390, height: 490)
                  }
                }
              }
              name
              path
              seo {
                metaDescription
                metaKeywords
                pageTitle
              }
            }
          }
        }
      }
    }
  }
`;

export const getCategoryProductQuery = /* GraphQL */ `
  query GetProdcutcus($productId: ID!) {
    site {
      product(id: $productId) {
        id
        addToCartUrl
        images {
          edges {
            node {
              altText
              url(width: 435, height: 500, lossy: false)
            }
          }
        }
        name
        description
      }
    }
  }
`;
