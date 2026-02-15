'use client';

import { Category } from '../lib/types';

interface CategoryFilterProps {
    currentCategory: Category;
    onSelect: (category: Category) => void;
}

const categories: { label: string; value: Category }[] = [
    { label: '전체', value: 'ALL' },
    { label: '뷰티', value: 'BEAUTY' },
    { label: '패션', value: 'FASHION' },
    { label: '푸드', value: 'FOOD' },
    { label: '라이프', value: 'LIFE' },
];

export default function CategoryFilter({ currentCategory, onSelect }: CategoryFilterProps) {
    return (
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
            {categories.map((cat) => (
                <button
                    key={cat.value}
                    onClick={() => onSelect(cat.value)}
                    className={`
            px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
            ${currentCategory === cat.value
                            ? 'bg-pink-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}
          `}
                >
                    {cat.label}
                </button>
            ))}
        </div>
    );
}
