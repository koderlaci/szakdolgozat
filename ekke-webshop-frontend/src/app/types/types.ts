export enum ProductType {
  MEN,
  WOMEN,
  ACCESSARY,
}

export type Product = {
  variantId: string;
  name: string;
  colors: string[];
  price: number;
};

export type EndProduct = {
  id: number;
  variantId: string;
  name: string;
  type: ProductType;
  color: string;
  size: string;
  price: number;
  quantity: number;
};

export type CartProduct = {
  id: number;
  variantId: string;
  name: string;
  type: ProductType;
  color: string;
  size: string;
  price: number;
  quantity: number;
  selectedQuantity: number;
};
