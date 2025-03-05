export interface Product {
  id: number;
  name: string;
  imageURL: string;
  count: number;
  size: {
    width: number;
    height: number;
  };
  weight: string;
}
