import { notFound } from 'next/navigation';
//---------------- queries ----------------//
import { getMenuQuery } from './queries/menu';
import { getPageQuery } from './queries/page';
import { getCategoryQuery } from './queries/category';
import { getEntityIdByRouteQuery } from './queries/route';
import { getStoreProductsQuery, getCategoryProductsQuery, getCategoryProductQuery, getProductQuery } from './queries/product';
//---------------- mappers ----------------//
// import { bigCommerceToVercelPageContent } from './mappers';
//---------------- constants ----------------//
import { BIGCOMMERCE_GRAPHQL_API_ENDPOINT } from './constants';
//---------------- types ----------------//
import { BigCommerceMenuOperation, BigCommerceSearchProductsOperation, BigCommerceCategoryPageOperation, BigCommerceEntityIdOperation, BigCommerceProductOperation } from './types';
import { isVercelCommerceError } from './type-guards';

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

export async function getMenu() {
  const res = await bigCommerceFetch<BigCommerceMenuOperation>({ query: getMenuQuery });
  return res.body.data.site.categoryTree ? res.body.data.site.categoryTree : [];
}

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

// get page
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
// get product
export async function getProduct(id: string) {
  const res = await bigCommerceFetch<BigCommerceProductOperation>({
    query: getProductQuery,
    variables: {
      productId: id,
    },
  });
  return res.body.data.site.product;
}
