import * as fromProductStore from '../pages/products/store/product/product.reducer';
import * as fromCategoryStore from '../pages/categories/store/category/category.reducer';

export interface AppState{
    product: fromProductStore.ProductState,
    category: fromCategoryStore.CategoryState
}