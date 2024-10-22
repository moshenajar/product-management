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

/*export const updateProductEffect = createEffect((
  actions$ = inject(Actions),
  productService = inject(ProductService)
  )=>{
    return actions$.pipe(
      ofType(fromProductAcctions.productActions.updateProduct),
      switchMap(() => {
        return productService.updateProduct().pipe(
          map((res: any) => {
            return fromProductAcctions.productActions.updateProductSuccess(fromProductAcctions.productActions.loadingAllProductsIntoStore))
          }),
          catchError(() => {
            return of(fromProductAcctions.productActions.loadingAllProductsIntoStoreFailure())
          })
        )
      },
    {functional: true}
  );*/
   

/*export const updateProductEffect = createEffect((
  actions$ = inject(Actions),
  productService = inject(ProductService)
  )=>{
    return actions$.pipe()
  },{});*/