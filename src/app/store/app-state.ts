import * as fromProductStore from '../pages/products/store/product/product.reducer';

export interface AppState{
    product: fromProductStore.ProductState
}