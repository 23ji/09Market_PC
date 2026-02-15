export type Category = "ALL" | "BEAUTY" | "FASHION" | "FOOD" | "LIFE";

export type ProductStatus = "OPEN" | "CLOSED" | "UPCOMING";

export interface Product {
  id: string;
  name: string;
  brand: string;
  influencer: string;
  category: Category;
  price: number;
  originalPrice?: number;
  discountRate?: number;
  startDate: string; // ISO Date string
  endDate: string;   // ISO Date string
  link: string;
  imageUrl: string;
  isHot?: boolean;
}
