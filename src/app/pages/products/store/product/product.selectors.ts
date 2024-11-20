import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProduct from "./product.reducer";
import { Product } from '../../product';

const selectProductFeature = createFeatureSelector<fromProduct.ProductState>(
    fromProduct.productFeatureKey
);

export const selectIsLoadProductsfromFile = createSelector(
    selectProductFeature, 
    (state: fromProduct.ProductState) => state.isLoadProductsfromFile
);

export const selectProducts = createSelector(
    selectProductFeature,
    (state: fromProduct.ProductState) => state.productList
  );

  export const selectFeature = (state:{product:{
    selectedProduct: Product | null,
    productList: Product[] | null
}}) => state.product

export const selectedProduct = createSelector(
    selectFeature, 
    (state) => state.selectedProduct
);