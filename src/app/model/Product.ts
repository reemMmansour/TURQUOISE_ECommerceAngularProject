export class Product {
  category: string;
  description: string;
  quantity?: number;
  id: number;
  image: string;
  price?: number;
  rating: {
    count: number;
    rate: number;
  };
  title: string;
  item: any;
}
