// Yeh interface batata hai ki fakestoreapi.com/products se kaisa data aata hai
// Isse humein TypeScript ka autocomplete + type-safety milti hai

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
