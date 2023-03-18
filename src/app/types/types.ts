export enum ProductType {
    MEN,
    WOMEN,
    ACCESSARY
}

export type Product = {
    variantId: string;
    name: string;
    colors: string[];
    price: number;
}