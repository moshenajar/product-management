import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { CategoryService } from "../../../services/category/category.service";
import * as fromCategoryActions from '../category/category.action';
import { catchError, filter, map, of, switchMap, withLatestFrom } from "rxjs";
import { selectIsLoadCategoriesfromFile } from "./category.selectors";
import { environment } from "../../../../../environments/environment";

export const loadCategoriesEffect = createEffect((
    actions$ = inject(Actions),
    store = inject(Store),
    categoryService = inject(CategoryService)
    )=> {
      return actions$.pipe(
        ofType(fromCategoryActions.categoryActions.loadCategories),
        withLatestFrom( store.select(selectIsLoadCategoriesfromFile)),
        filter(([action, isLoadCategoriesfromFile]) => 
          //check if stubs mode 
          //only first time get products from json file
          //empty json file must include []
          //environment.isStubs === false || (!productsList || !productsList.length)
          environment.isStubs === false  || (environment.isStubs === true && isLoadCategoriesfromFile === false)
         ),
        switchMap(() => {
          return categoryService.getCategories().pipe(
            map((res: any) => {
              return fromCategoryActions.categoryActions.loadCategoriesSuccess({ categoryList: res })
            }),
            catchError((error) => {
              return of(fromCategoryActions.categoryActions.loadCategoriesFailure({ error }))
            })
          )
        })
      )
    }, 
    {functional: true}
  );

  export const updateCategoryEffect = createEffect((
    actions$ = inject(Actions),
    store = inject(Store),
    categoryService = inject(CategoryService)
    )=>{
      return actions$.pipe(
        ofType(fromCategoryActions.categoryActions.updateCategory),
        filter(() => environment.isStubs === false),
        switchMap((category) => {
          return categoryService.updateCategory(category.category).pipe(
            map((res: any) => {
              return fromCategoryActions.categoryActions.updateCategorySuccess()
            }),
            catchError((error) => {
              return of(fromCategoryActions.categoryActions.updateCategoryFailure( {error} ))
            })
          )
  
        })
       )
      }, 
      {functional: true}
    );

  export const createCategoryEffect = createEffect((
    actions$ = inject(Actions),
    categoryService = inject(CategoryService)
    )=>{
      return actions$.pipe(
        ofType(fromCategoryActions.categoryActions.createCategory),
        filter(() => environment.isStubs === false),
        switchMap((category) => {
          return categoryService.createCategory(category.category).pipe(
            map((res: any) => {
              return fromCategoryActions.categoryActions.createCategorySuccess()
            }),
            catchError((error) => {
              return of(fromCategoryActions.categoryActions.createCategoryFailure( {error} ))
            })
          )
        })
        )
      }, 
      {functional: true}
    );

    export const deleteCategoryEffect = createEffect((
      actions$ = inject(Actions),
      categoryService = inject(CategoryService)
      )=>{
        return actions$.pipe(
          ofType(fromCategoryActions.categoryActions.deleteCategory),
          filter(() => environment.isStubs === false),
          switchMap((category) => {
            return categoryService.deleteCategory(category.categoryId).pipe(
              map((res: any) => {
                return fromCategoryActions.categoryActions.deleteCategorySuccess()
              }),
              catchError((error) => {
                return of(fromCategoryActions.categoryActions.deleteCategoryFailure( {error} ))
              })
            )
          })
         )
        }, 
        {functional: true}
      );