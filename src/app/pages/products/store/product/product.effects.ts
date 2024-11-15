import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../../services/product/product.service';
import * as fromProductAcctions from '../product/product.action';


export const loadProductsEffect = createEffect((
  actions$ = inject(Actions),
  productService = inject(ProductService)
  )=> {
    return actions$.pipe(
      ofType(fromProductAcctions.productActions.loadProducts),
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
        switchMap((product) => {
          return productService.createProduct(product.product).pipe(
            map((res: any) => {
              //return of(fromProductAcctions.productActions.updateProductSuccess())
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

 
  /*export const updateProductSuccess = createEffect((
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
  );*/

   

/*export const updateProductEffect = createEffect((
  actions$ = inject(Actions),
  productService = inject(ProductService)
  )=>{
    return actions$.pipe()
  },{});*/