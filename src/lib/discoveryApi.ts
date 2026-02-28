/**
 * Discovery API Client
 * Handles communication with tl-store backend for marketplace discovery
 */

const STORE_API_BASE = process.env.REACT_APP_STORE_API_URL || 'http://localhost:3000/api';

export interface Store {
  id: number;
  creatorId: number;
  displayName: string;
  bio?: string;
  profilePictureUrl?: string;
  followerCount: number;
  productCount: number;
  storeUrl: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: 'tops' | 'bottoms' | 'accessories';
  imageUrl?: string;
  creatorName: string;
  creatorId: number;
  sales?: number;
  storeUrl: string;
}

export interface DiscoveryFilters {
  search?: string;
  category?: 'tops' | 'bottoms' | 'accessories';
  sort?: 'trending' | 'newest' | 'price-low' | 'price-high';
  limit?: number;
  offset?: number;
}

/**
 * Fetch all creator stores for discovery
 */
export async function fetchStores(filters?: {
  limit?: number;
  offset?: number;
  sort?: 'followers' | 'products' | 'newest';
}): Promise<Store[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.offset) params.append('offset', filters.offset.toString());
    if (filters?.sort) params.append('sort', filters.sort);

    const response = await fetch(
      `${STORE_API_BASE}/storefront/stores?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch stores: ${response.statusText}`);
    }

    const data = await response.json();
    return data.stores || [];
  } catch (error) {
    console.error('[Discovery API] Failed to fetch stores:', error);
    throw error;
  }
}

/**
 * Fetch trending products for discovery
 */
export async function fetchTrendingProducts(filters?: {
  category?: string;
  limit?: number;
  timeframe?: 'day' | 'week' | 'month';
}): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.timeframe) params.append('timeframe', filters.timeframe);

    const response = await fetch(
      `${STORE_API_BASE}/storefront/trending?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch trending products: ${response.statusText}`);
    }

    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('[Discovery API] Failed to fetch trending products:', error);
    throw error;
  }
}

/**
 * Search products across all stores
 */
export async function searchProducts(query: string, filters?: DiscoveryFilters): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    params.append('q', query);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.sort) params.append('sort', filters.sort);
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.offset) params.append('offset', filters.offset.toString());

    const response = await fetch(
      `${STORE_API_BASE}/storefront/search?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to search products: ${response.statusText}`);
    }

    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('[Discovery API] Failed to search products:', error);
    throw error;
  }
}

/**
 * Get products for a specific store
 */
export async function fetchStoreProducts(
  creatorId: number,
  filters?: {
    category?: string;
    limit?: number;
    offset?: number;
  }
): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.offset) params.append('offset', filters.offset.toString());

    const response = await fetch(
      `${STORE_API_BASE}/storefront/creators/${creatorId}/products?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch store products: ${response.statusText}`);
    }

    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('[Discovery API] Failed to fetch store products:', error);
    throw error;
  }
}

/**
 * Get product details
 */
export async function fetchProduct(productId: number): Promise<Product & { variants?: any[] }> {
  try {
    const response = await fetch(
      `${STORE_API_BASE}/storefront/products/${productId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('[Discovery API] Failed to fetch product:', error);
    throw error;
  }
}

/**
 * Get store details
 */
export async function fetchStore(creatorId: number): Promise<Store & { products?: Product[] }> {
  try {
    const response = await fetch(
      `${STORE_API_BASE}/storefront/creators/${creatorId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch store: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('[Discovery API] Failed to fetch store:', error);
    throw error;
  }
}

/**
 * Get featured/curated products
 */
export async function fetchFeaturedProducts(limit: number = 12): Promise<Product[]> {
  try {
    const response = await fetch(
      `${STORE_API_BASE}/storefront/featured?limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch featured products: ${response.statusText}`);
    }

    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('[Discovery API] Failed to fetch featured products:', error);
    throw error;
  }
}

/**
 * Get product categories with counts
 */
export async function fetchCategories(): Promise<
  Array<{ id: string; name: string; count: number }>
> {
  try {
    const response = await fetch(`${STORE_API_BASE}/storefront/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error('[Discovery API] Failed to fetch categories:', error);
    throw error;
  }
}

/**
 * Track product view for analytics
 */
export async function trackProductView(productId: number): Promise<void> {
  try {
    await fetch(`${STORE_API_BASE}/storefront/analytics/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });
  } catch (error) {
    console.warn('[Discovery API] Failed to track view:', error);
    // Don't throw - analytics failure shouldn't break the app
  }
}

/**
 * Track product click for analytics
 */
export async function trackProductClick(productId: number): Promise<void> {
  try {
    await fetch(`${STORE_API_BASE}/storefront/analytics/click`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });
  } catch (error) {
    console.warn('[Discovery API] Failed to track click:', error);
    // Don't throw - analytics failure shouldn't break the app
  }
}
