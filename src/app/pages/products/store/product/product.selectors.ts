import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProduct from "./product.reducer";
import { Product } from '../../../interface/product';

const selectProductFeature = createFeatureSelector<fromProduct.ProductState>(
    fromProduct.productFeatureKey
);

export const selectIsLoadProductsfromFile = createSelector(
    selectProductFeature, 
    (state: fromProduct.ProductState) => state.isLoadProductsfromFile
);

/*export const selectIsLoadCategoriesfromFile = createSelector(
    selectProductFeature, 
    (state: fromProduct.ProductState) => state.isLoadCategoriesfromFile
);*/

export const selectProducts = createSelector(
    selectProductFeature,
    (state: fromProduct.ProductState) => state.productList
  );

  /*export const selectCategories = createSelector(
    selectProductFeature,
    (state: fromProduct.ProductState) => state.categoryList
  );*/

 /* export const selectFeature = (state:{product:{
    selectedProduct: Product | null,
    productList: Product[] | null
}}) => state.product

export const selectedProduct = createSelector(
    selectFeature, 
    (state) => state.selectedProduct
);*/


export const selectedProduct = createSelector(
    selectProductFeature, 
    (state) => state.selectedProduct
);