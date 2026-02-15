import Link from 'next/link';
import { Product } from '../lib/types';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const dDay = getDDay(product.endDate);

    return (
        <Link href={product.link} className="group block" target="_blank">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-2">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-90 transition-opacity"
                />
                {/* D-Day Badge */}
                <div className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                    {dDay}
                </div>
            </div>

            <div className="space-y-1">
                <p className="text-xs text-gray-500 font-medium">{product.brand}</p>
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">
                    {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-pink-600 font-bold text-sm">{product.discountRate}%</span>
                    <span className="text-gray-900 font-bold text-sm">
                        {product.price.toLocaleString()}원
                    </span>
                    {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                            {product.originalPrice.toLocaleString()}
                        </span>
                    )}
                </div>
                <div className="text-xs text-gray-500 pt-1 flex items-center gap-1">
                    <span className="w-4 h-4 rounded-full bg-gray-200 inline-block"></span>
                    {product.influencer}
                </div>
            </div>
        </Link>
    );
}

function getDDay(endDate: string) {
    const end = new Date(endDate);
    const now = new Date();

    // Reset time part for accurate date comparison
    end.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "마감";
    if (diffDays === 0) return "D-Day";
    return `D-${diffDays}`;
}
