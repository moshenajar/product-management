import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProduct from "./product.reducer";

const selectProductFeature = createFeatureSelector<fromProduct.ProductState>(fromProduct.productFeatureKey);
export const selectProduct = createSelector(selectProductFeature, (state: fromProduct.ProductState) => state.selectedProduct);