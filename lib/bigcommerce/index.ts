import { isVercelCommerceError } from './type-guards';
import { BIGCOMMERCE_GRAPHQL_API_ENDPOINT } from './constants';
import { getMenuQuery } from './queries/menu';
import { getStoreProductsQuery } from './queries/product';
import { BigCommerceMenuOperation, BigCommerceSearchProductsOperation, VercelProduct } from './types';

// ----------------------------------------------------------------------------------------------------------

const channelIdSegment = parseInt(process.env.BIGCOMMERCE_CHANNEL_ID!) !== 1 ? `-${process.env.BIGCOMMERCE_CHANNEL_ID}` : '';
const domain = `https://store-${process.env.BIGCOMMERCE_STORE_HASH!}${channelIdSegment}`;
const endpoint = `${domain}.${BIGCOMMERCE_GRAPHQL_API_ENDPOINT}`;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

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
