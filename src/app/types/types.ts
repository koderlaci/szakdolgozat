export enum ProductType {
    MEN,
    WOMEN,
    ACCESSARY
}

export type Product = {
    variantId: number;
    name: string;
    colors: string[];
    price: number;
}