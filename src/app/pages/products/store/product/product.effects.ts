import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../../services/product/product.service';
import * as fromProductAcctions from '../product/product.action';


export const loadingAllProductsIntoStoreEffect = createEffect((
  actions$ = inject(Actions),
  productService = inject(ProductService)
  )=> {
    return actions$.pipe(
      ofType(fromProductAcctions.productActions.loadingAllProductsIntoStore),
      switchMap(() => {
        return productService.getProducts().pipe(
          map((res: any) => {
            return fromProductAcctions.productActions.loadingAllProductsIntoStoreSuccess({ productList: res })
          }),
          catchError(() => {
            return of(fromProductAcctions.productActions.loadingAllProductsIntoStoreFailure())
          })
        )
      })
    )
  }, 
  {functional: true}
);

export const updateProductEffect = createEffect((
  actions$ = inject(Actions),
  productService = inject(ProductService)
  )=>{
    return actions$.pipe(
      ofType(fromProductAcctions.productActions.updateProduct),
      switchMap((product) => {
        return productService.updateProduct(product.product).pipe(
          map((res: any) => {
            //return of(fromProductAcctions.productActions.updateProductSuccess())
            return fromProductAcctions.productActions.updateProductSuccess()
          }),
          catchError(() => {
            return of(fromProductAcctions.productActions.updateProductFailure())
          })
        )
      })
     )
    }, 
    {functional: true}
  );

 
  export const updateProductSuccess = createEffect((
      actions$ = inject(Actions)
      ) => {
        return actions$.pipe(
        ofType(fromProductAcctions.productActions.updateProductSuccess),
        //tap(_ => console.log('app effect started polling')),
        map((res: any) => {
          return fromProductAcctions.productActions.resetProduct()
        })
      );
    },
    { functional: true, dispatch: true }
  );

   

/*export const updateProductEffect = createEffect((
  actions$ = inject(Actions),
  productService = inject(ProductService)
  )=>{
    return actions$.pipe()
  },{});*/