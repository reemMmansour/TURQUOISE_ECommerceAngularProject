export class Product {
  // push(event: any) {
  //   throw new Error('Method not implemented.');
  // }
  category: string;
  description: string;
  quantity?: number;
  // id?: number; empty or no
  // id!: number; undefine
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
