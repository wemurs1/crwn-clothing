import { Product } from "./product";

export interface CartItemModel extends Product {
    quantity: number;
}