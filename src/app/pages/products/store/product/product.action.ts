import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { Product } from "../../../interface/product";
import { Category } from "../../../interface/category";


/*
export const updateAllProducts = createAction(
    '[Product] Update all state of products',
    props<{ productList: Product[] }>()
);


  export const loadData = createAction(
    '[Data Page] Load Data'
);
  export const loadDataSuccess = createAction(
    '[Data Page] Load Data Success', 
    props<{  productList: Product[] }>()
);
  export const loadDataFailure = createAction(
    '[Data Page] Load Data Failure', 
    props<{ error: any }>()
);

*/

export const productActions = createActionGroup({
  source: 'product',
  events: {
    resetProduct: emptyProps(),
    setSelectedProduct: props<{ product:Product }>(),
    //setSelectCategory: props<{ categoryId:number }>(),

    //loadCategories : emptyProps(),
    //'loadCategories success': props<{ categoryList: Category[] }>(),
    //'loadCategories Failure': props<{ error: any }>(), 

    loadProducts : emptyProps(),
    'loadProducts success': props<{ productList: Product[] }>(),
    'loadProducts Failure': props<{ error: any }>(), 

    UpdateProduct: props<{ product: Product}>(),
    'UpdateProduct success': emptyProps(),
    'UpdateProduct failure': props<{ error: any }>(), 

    CreateProduct: props<{ product: Product}>(),
    'CreateProduct success': emptyProps(),
    'CreateProduct failure': props<{ error: any }>(),

    DeleteProduct: props<{ productId: string}>(),
    'DeleteProduct success': emptyProps(),
    'DeleteProduct failure': props<{ error: any }>(),
  },
})

