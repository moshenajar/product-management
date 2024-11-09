import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { Product } from "../../product";


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

    LoadingAllProductsIntoStore: emptyProps(),
    'LoadingAllProductsIntoStore success': props<{ productList: Product[] }>(),
    'LoadingAllProductsIntoStore failure': emptyProps(),

    UpdateProduct: props<{ product: Product}>(),
    'UpdateProduct success': emptyProps(),
    'UpdateProduct failure': emptyProps(),

    CreateProduct: props<{ product: Product}>(),
    'CreateProduct success': emptyProps(),
    'CreateProduct failure': emptyProps(),
  },
})

