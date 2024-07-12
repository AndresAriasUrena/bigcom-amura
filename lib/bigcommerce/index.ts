import { notFound } from 'next/navigation';
//---------------- queries ----------------//
import { getMenuQuery } from './queries/menu';
import { getEntityIdByRouteQuery } from './queries/route';
import { getStoreProductsQuery, getCategoryProductsQuery, getProductQuery, getProductsRecommedationsQuery, searchProductsQuery } from './queries/product';
import { getCartQuery } from './queries/cart';
import { getCheckoutQuery } from './queries/checkout';
import { getStoreCategoriesQuery, getCategoryQuery } from './queries/category';
import { getPagesQuery } from './queries/page';
//---------------- mappers ----------------//
// prettier-ignore
import { bigCommerceToVercelCart, bigCommerceToVercelProduct, vercelFromBigCommerceLineItems,
  bigCommerceToVercelProducts, bigCommerceToVercelCollection,bigCommerceToVercelPageContent } from './mappers';
//---------------- constants ----------------//
import { BIGCOMMERCE_GRAPHQL_API_ENDPOINT } from './constants';
//---------------- types ----------------//
// prettier-ignore
import { BigCommerceMenuOperation, BigCommerceSearchProductsOperation,BigCommerceCategoryPageOperation,BigCommerceEntityIdOperation,
  BigCommerceProductOperation,VercelCart,BigCommerceCartOperation,BigCommerceCheckoutOperation,BigCommerceProduct,BigCommerceProductsOperation,
  BigCommerceCart, BigCommerceAddToCartOperation,BigCommerceCreateCartOperation,BigCommerceDeleteCartItemOperation,
  BigCommerceUpdateCartItemOperation,VercelProduct,BigCommerceRecommendationsOperation,BigCommerceCollectionsOperation,
  BigCommerceCollectionOperation,VercelCollection,VercelPage,BigCommercePagesOperation } from './types';

import { isVercelCommerceError } from './type-guards';
// --------------- mutations ------------------//
import { addCartLineItemMutation, createCartMutation, deleteCartLineItemMutation, updateCartLineItemMutation } from './mutations/cart';
// --------------- config ------------------//
import { memoizedCartRedirectUrl } from './storefront-config';

// ----------------------------------------------------------------------------------------------------------

const channelIdSegment = parseInt(process.env.BIGCOMMERCE_CHANNEL_ID!) !== 1 ? `-${process.env.BIGCOMMERCE_CHANNEL_ID}` : '';
const domain = `https://store-${process.env.BIGCOMMERCE_STORE_HASH!}${channelIdSegment}`;
const endpoint = `${domain}.${BIGCOMMERCE_GRAPHQL_API_ENDPOINT}`;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

// ------------------------------------------------------------------------------------------------------------

export async function bigCommerceFetch<T>({ query, variables, headers, cache = 'force-cache' }: { query: string; variables?: ExtractVariables<T>; headers?: HeadersInit; cache?: RequestCache }): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json', Authorization: `Bearer ${process.env.BIGCOMMERCE_CUSTOMER_IMPERSONATION_TOKEN}`, 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify({ ...(query && { query }), ...(variables && { variables }) }),
      cache,
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return { status: result.status, body };
  } catch (e) {
    if (isVercelCommerceError(e)) {
      throw { status: e.status || 500, message: e.message, query };
    }

    throw { error: e, query };
  }
}

// ------------------------- menu --------------------------------
export async function getMenu() {
  const res = await bigCommerceFetch<BigCommerceMenuOperation>({ query: getMenuQuery });
  return res.body.data.site.categoryTree ? res.body.data.site.categoryTree : [];
}
// ------------------------- categories --------------------------------
export async function getCategories() {
  const res = await bigCommerceFetch<BigCommerceCollectionsOperation>({
    query: getStoreCategoriesQuery,
  });

  return res.body.data.site.categoryTree;
}

export async function getCollections(): Promise<VercelCollection[]> {
  const res = await bigCommerceFetch<BigCommerceCollectionsOperation>({
    query: getStoreCategoriesQuery,
  });
  const collectionIdList = res.body.data.site.categoryTree.map(({ entityId }) => entityId);
  const collections = await Promise.all(
    collectionIdList.map(async (entityId) => {
      const res = await bigCommerceFetch<BigCommerceCollectionOperation>({
        query: getCategoryQuery,
        variables: {
          entityId,
        },
      });
      return bigCommerceToVercelCollection(res.body.data.site.category);
    })
  );

  return collections;
}

// ------------------------- products --------------------------------
export async function getProducts() {
  const res = await bigCommerceFetch<BigCommerceSearchProductsOperation>({ query: getStoreProductsQuery });
  return res.body.data.site.products.edges.map((item) => item.node);
}

// get Entity Id By Handle
const getEntityIdByHandle = async (entityHandle: string) => {
  const res = await bigCommerceFetch<BigCommerceEntityIdOperation>({
    query: getEntityIdByRouteQuery,
    variables: {
      path: `/${entityHandle}`,
    },
  });

  return res.body.data.site.route.node?.entityId;
};

// get page of products
export async function getPage(category: string) {
  const entityId = await getEntityIdByHandle(category);

  const res = await bigCommerceFetch<BigCommerceCategoryPageOperation>({
    query: getCategoryProductsQuery,
    variables: {
      entityId: entityId,
    },
  });
  return res.body.data.site.category;
}

// ------------------------------------ product ----------------------------------

// get product
export async function getProduct(id: string) {
  const res = await bigCommerceFetch<BigCommerceProductOperation>({
    query: getProductQuery,
    variables: {
      productId: id,
    },
  });

  return bigCommerceToVercelProduct(res.body.data.site.product);
}

export async function getProductRecommendations(productId: string): Promise<VercelProduct[]> {
  const res = await bigCommerceFetch<BigCommerceRecommendationsOperation>({
    query: getProductsRecommedationsQuery,
    variables: {
      productId: productId,
    },
  });

  const productList = res.body.data.site.product.relatedProducts.edges.map((item) => item.node);

  return bigCommerceToVercelProducts(productList);
}

const getBigCommerceProductsWithCheckout = async (cartId: string, lines: { merchandiseId: string; quantity: number; productId?: string }[]) => {
  const productIds = lines.map(({ merchandiseId, productId }) => parseInt(productId ?? merchandiseId, 10));
  const bigCommerceProductListRes = await bigCommerceFetch<BigCommerceProductsOperation>({
    query: getStoreProductsQuery,
    variables: {
      entityIds: productIds,
    },
    cache: 'no-store',
  });
  const bigCommerceProductList = bigCommerceProductListRes.body.data.site.products.edges.map((product) => product.node);

  const createProductList = (idList: number[], products: BigCommerceProduct[]) => {
    return idList.map((productId) => {
      const productData = products.find(({ entityId }) => entityId === productId)!;

      return {
        productId,
        productData,
      };
    });
  };

  const bigCommerceProducts = createProductList(productIds, bigCommerceProductList);

  const resCheckout = await bigCommerceFetch<BigCommerceCheckoutOperation>({
    query: getCheckoutQuery,
    variables: {
      entityId: cartId,
    },
    cache: 'no-store',
  });
  const checkout = resCheckout.body.data.site.checkout ?? {
    subtotal: {
      value: 0,
      currencyCode: '',
    },
    grandTotal: {
      value: 0,
      currencyCode: '',
    },
    taxTotal: {
      value: 0,
      currencyCode: '',
    },
  };

  const checkoutUrlRes = await memoizedCartRedirectUrl(cartId);
  const checkoutUrl = checkoutUrlRes.data?.embedded_checkout_url;

  return {
    productsByIdList: bigCommerceProducts,
    checkoutUrl,
    checkout,
  };
};

// ------------------------------ cart --------------------------------- //

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number; productId?: string }[]): Promise<VercelCart> {
  let bigCommerceCart: BigCommerceCart;

  if (cartId) {
    const res = await bigCommerceFetch<BigCommerceAddToCartOperation>({
      query: addCartLineItemMutation,
      variables: {
        addCartLineItemsInput: {
          cartEntityId: cartId,
          data: {
            lineItems: lines.map(({ merchandiseId, quantity, productId }) => ({
              productEntityId: parseInt(productId!, 10),
              variantEntityId: parseInt(merchandiseId, 10),
              quantity,
            })),
          },
        },
      },
      cache: 'no-store',
    });

    bigCommerceCart = res.body.data.cart.addCartLineItems.cart;
  } else {
    const res = await bigCommerceFetch<BigCommerceCreateCartOperation>({
      query: createCartMutation,
      variables: {
        createCartInput: {
          lineItems: lines.map(({ merchandiseId, quantity, productId }) => ({
            productEntityId: parseInt(productId!, 10),
            variantEntityId: parseInt(merchandiseId, 10),
            quantity,
          })),
        },
      },
      cache: 'no-store',
    });

    bigCommerceCart = res.body.data.cart.createCart.cart;
  }

  const { productsByIdList, checkout, checkoutUrl } = await getBigCommerceProductsWithCheckout(bigCommerceCart.entityId, lines);

  return bigCommerceToVercelCart(bigCommerceCart, productsByIdList, checkout, checkoutUrl);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<VercelCart | undefined> {
  let cartState: { status: number; body: BigCommerceDeleteCartItemOperation };
  const removeCartItem = async (itemId: string) => {
    const res = await bigCommerceFetch<BigCommerceDeleteCartItemOperation>({
      query: deleteCartLineItemMutation,
      variables: {
        deleteCartLineItemInput: {
          cartEntityId: cartId,
          lineItemEntityId: itemId,
        },
      },
      cache: 'no-store',
    });

    return res;
  };

  if (lineIds.length === 1) {
    cartState = await removeCartItem(lineIds[0]!);
  } else if (lineIds.length > 1) {
    // NOTE: can it happen at all??
    let operations = lineIds.length;

    while (operations > 0) {
      operations--;
      cartState = await removeCartItem(lineIds[operations]!);
    }
  }

  const cart = cartState!.body.data.cart.deleteCartLineItem.cart;

  if (cart === null) {
    return undefined;
  }

  const lines = vercelFromBigCommerceLineItems(cart.lineItems);
  const { productsByIdList, checkout, checkoutUrl } = await getBigCommerceProductsWithCheckout(cartId, lines);

  return bigCommerceToVercelCart(cart, productsByIdList, checkout, checkoutUrl);
}

export async function getProductIdBySlug(path: string): Promise<{ __typename: 'Product' | 'Category' | 'Brand' | 'NormalPage' | 'ContactPage' | 'RawHtmlPage' | 'BlogIndexPage'; entityId: number } | undefined> {
  const res = await bigCommerceFetch<BigCommerceEntityIdOperation>({
    query: getEntityIdByRouteQuery,
    variables: {
      path,
    },
  });

  return res.body.data.site.route.node;
}

// NOTE: update happens on product & variant levels w/t optionEntityId
export async function updateCart(cartId: string, lines: { id: string; merchandiseId: string; quantity: number; productSlug?: string }[]): Promise<VercelCart> {
  let cartState: { status: number; body: BigCommerceUpdateCartItemOperation } | undefined;

  for (let updates = lines.length; updates > 0; updates--) {
    const { id, merchandiseId, quantity, productSlug } = lines[updates - 1]!;
    const productEntityId = (await getProductIdBySlug(productSlug!))?.entityId!;

    const res = await bigCommerceFetch<BigCommerceUpdateCartItemOperation>({
      query: updateCartLineItemMutation,
      variables: {
        updateCartLineItemInput: {
          cartEntityId: cartId,
          lineItemEntityId: id,
          data: {
            lineItem: {
              variantEntityId: parseInt(merchandiseId, 10),
              productEntityId,
              quantity,
            },
          },
        },
      },
      cache: 'no-store',
    });

    cartState = res;
  }

  const updatedCart = cartState!.body.data.cart.updateCartLineItem.cart;
  const { productsByIdList, checkout, checkoutUrl } = await getBigCommerceProductsWithCheckout(cartId, lines);

  return bigCommerceToVercelCart(updatedCart, productsByIdList, checkout, checkoutUrl);
}

export async function getCart(cartId: string): Promise<VercelCart | undefined> {
  const res = await bigCommerceFetch<BigCommerceCartOperation>({
    query: getCartQuery,
    variables: { entityId: cartId },
    cache: 'no-store',
  });

  if (!res.body.data.site.cart) {
    return undefined;
  }

  const cart = res.body.data.site.cart;
  const lines = vercelFromBigCommerceLineItems(cart.lineItems);
  const { productsByIdList, checkout, checkoutUrl } = await getBigCommerceProductsWithCheckout(cartId, lines);

  return bigCommerceToVercelCart(cart, productsByIdList, checkout, checkoutUrl);
}

// ------------------------------------ search ----------------------------------

export async function searchProducts({ query, reverse, sortKey }: { query?: string; reverse?: boolean; sortKey?: string }): Promise<VercelProduct[]> {
  const res = await bigCommerceFetch<BigCommerceSearchProductsOperation>({
    query: searchProductsQuery,
    variables: {
      filters: {
        searchTerm: query || '',
      },
    },
  });

  const productList = res.body.data.site.search.searchProducts.products.edges.map((item) => item.node);

  return bigCommerceToVercelProducts(productList);
}

// ------------------------------------ other ----------------------------------
export async function getPages(): Promise<VercelPage[]> {
  const res = await bigCommerceFetch<BigCommercePagesOperation>({
    query: getPagesQuery,
  });

  const pagesList = res.body.data.site.content.pages.edges.map((item) => item.node);

  return pagesList.map((page) => bigCommerceToVercelPageContent(page));
}
