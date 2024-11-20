import { inject } from '@angular/core';
import { catchError, exhaustMap, filter, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../../services/product/product.service';
import * as fromProductAcctions from '../product/product.action';
import * as fromProductReducer from '../product/product.reducer';
import { selectIsLoadProductsfromFile, selectProducts } from '../product/product.selectors';
import { env } from 'process';
import { environment } from '../../../../../environments/environment';
import { Product } from '../../product'
import { AppState } from '../../../../store/app-state'
import { Store } from '@ngrx/store';


export const loadProductsEffect = createEffect((
  actions$ = inject(Actions),
  store = inject(Store),
  productService = inject(ProductService)
  )=> {
    return actions$.pipe(
      ofType(fromProductAcctions.productActions.loadProducts),
      withLatestFrom( store.select(selectIsLoadProductsfromFile)),
      filter(([action, isLoadProductsfromFile]) => 
        //check if stubs mode 
        //only first time get products from json file
        //empty json file must include []
        //environment.isStubs === false || (!productsList || !productsList.length)
        environment.isStubs === false  || (environment.isStubs === true && isLoadProductsfromFile === false)
       ),
      switchMap(() => {
        return productService.getProducts().pipe(
          map((res: any) => {
            return fromProductAcctions.productActions.loadProductsSuccess({ productList: res })
          }),
          catchError((error) => {
            return of(fromProductAcctions.productActions.loadProductsFailure({ error }))
          })
        )
      })
    )
  }, 
  {functional: true}
);

export const updateProductEffect = createEffect((
  actions$ = inject(Actions),
  store = inject(Store),
  productService = inject(ProductService)
  )=>{
    return actions$.pipe(
      ofType(fromProductAcctions.productActions.updateProduct),
      filter(() => environment.isStubs === false),
      switchMap((product) => {
        return productService.updateProduct(product.product).pipe(
          map((res: any) => {
            return fromProductAcctions.productActions.updateProductSuccess()
          }),
          catchError((error) => {
            return of(fromProductAcctions.productActions.updateProductFailure( {error} ))
          })
        )

      })
     )
    }, 
    {functional: true}
  );

  export const createProductEffect = createEffect((
    actions$ = inject(Actions),
    productService = inject(ProductService)
    )=>{
      return actions$.pipe(
        ofType(fromProductAcctions.productActions.createProduct),
        filter(() => environment.isStubs === false),
        switchMap((product) => {
          return productService.createProduct(product.product).pipe(
            map((res: any) => {
              return fromProductAcctions.productActions.createProductSuccess()
            }),
            catchError((error) => {
              return of(fromProductAcctions.productActions.createProductFailure( {error} ))
            })
          )
        })
       )
      }, 
      {functional: true}
    );

    export const deleteProductEffect = createEffect((
      actions$ = inject(Actions),
      productService = inject(ProductService)
      )=>{
        return actions$.pipe(
          ofType(fromProductAcctions.productActions.deleteProduct),
          filter(() => environment.isStubs === false),
          switchMap((product) => {
            return productService.deleteProduct(product.productId).pipe(
              map((res: any) => {
                return fromProductAcctions.productActions.deleteProductSuccess()
              }),
              catchError((error) => {
                return of(fromProductAcctions.productActions.deleteProductFailure( {error} ))
              })
            )
          })
         )
        }, 
        {functional: true}
      );

 /*
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

   */

/*export const updateProductEffect = createEffect((
  actions$ = inject(Actions),
  productService = inject(ProductService)
  )=>{
    return actions$.pipe()
  },{});*/