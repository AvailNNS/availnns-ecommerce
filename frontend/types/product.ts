export interface Product {

  _id: string;

  name: string;

  price: number;

  description?: string;

  images?: {
    url:string;
    public_id:string;
  }[];

  category?: any;

}