import { Action, createReducer, on } from "@ngrx/store"
import { Product } from "../../product";
import { setSelectedProduct } from "./product.action";

//export const productFeatureKey: "product" = 'product';
export const productFeatureKey = 'product';


export interface ProductState{
    selectedProduct: Product | null
}

const initialState: ProductState = {
    selectedProduct: null
};

export const reduser = createReducer(
    initialState,
    on(setSelectedProduct, (state, action) => ({...state, selectedProduct: action.product })),
);

export function productReducer(state: ProductState | undefined, action: Action){
    return reduser (state, action);
}