export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  colors?: string[];
}