'use client';

import { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value); // Real-time search
    };

    return (
        <div className="relative w-full max-w-md mx-auto mb-6">
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                    type="search"
                    value={query}
                    onChange={handleChange}
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-200 rounded-2xl bg-gray-50 focus:ring-pink-500 focus:border-pink-500 shadow-sm"
                    placeholder="사고 싶은 제품명, 브랜드를 검색해보세요"
                    required
                />
            </div>
        </div>
    );
}
