import { createAction, props } from "@ngrx/store";
import { Product } from "../../product";

export const setSelectedProduct = createAction('[Product] Set selected product', props<{ product:Product }>());