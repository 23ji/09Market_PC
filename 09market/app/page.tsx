'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Category, Product, ProductStatus } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';

// DB Row Type Definition (matches Supabase schema)
interface ProductRow {
  id: string;
  name: string;
  brand: string;
  influencer: string;
  category: string;
  price: number;
  original_price: number | null;
  discount_rate: number | null;
  start_date: string;
  end_date: string;
  link: string;
  image_url: string;
  is_hot: boolean;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState<Category>('ALL');

  // Fetch from Supabase
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('end_date', { ascending: true }); // 마감 임박 순 정렬

        if (error) {
          console.error('Error fetching products:', error);
          return;
        }

        if (data) {
          // Convert DB rows (snake_case) to Frontend types (camelCase)
          const formattedData: Product[] = (data as ProductRow[]).map(row => ({
            id: row.id,
            name: row.name,
            brand: row.brand,
            influencer: row.influencer,
            category: row.category as Category,
            price: row.price,
            originalPrice: row.original_price || undefined,
            discountRate: row.discount_rate || undefined,
            startDate: row.start_date,
            endDate: row.end_date,
            link: row.link,
            imageUrl: row.image_url,
            isHot: row.is_hot
          }));
          setProducts(formattedData);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Filter Logic (Client-side filtering for MVP)
  const filteredProducts = products.filter((product) => {
    // 1. Search Query Filter
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.influencer.toLowerCase().includes(query);

    // 2. Category Filter
    const matchesCategory =
      currentCategory === 'ALL' || product.category === currentCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="bg-gray-50 min-h-screen pb-20">
      {/* Header / Nav */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight text-pink-600">공구마켓</h1>
          <button className="p-2">
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-md mx-auto px-4 pt-20">

        {/* Search Bar */}
        <div className="mb-4">
          <SearchBar onSearch={setSearchQuery} />
        </div>

        {/* Category Filter */}
        <div className="sticky top-14 bg-gray-50 z-40 py-2 mb-4">
          <CategoryFilter
            currentCategory={currentCategory}
            onSelect={setCurrentCategory}
          />
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-2 py-20 text-center text-gray-400">
                <p>검색 결과가 없어요 🥲</p>
                <p className="text-sm mt-1">다른 검색어(브랜드, 제품명)로 찾아보세요!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
