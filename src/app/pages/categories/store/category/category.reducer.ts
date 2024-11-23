import { createFeature, createReducer, on } from "@ngrx/store";
import { Category } from "../../../interface/category";
import { categoryActions } from "./category.action";
import { environment } from "../../../../../environments/environment";

export interface CategoryState{
    isStubs: boolean,
    selectedCategory: Category | null,
    categoryList: Category[],
    isLoadCategoriesfromFile: boolean,
}

const initialState: CategoryState = {
    isStubs: environment.isStubs,
    selectedCategory: null,
    categoryList: [],
    isLoadCategoriesfromFile: false
}

const categoryFeature = createFeature({
    name: 'category',
    reducer: createReducer(
        initialState,
        on(categoryActions.resetCategory, (state) => ({
            isStubs: environment.isStubs,
            selectedCategory: null,
            categoryList: [],
            isLoadCategoriesfromFile: false
          })),

          on(categoryActions.setSelectCategory, (state, {category}) => ({
              ...state, 
              selectedCategory: category 
          })),

          on(categoryActions.loadCategories, (state) => ({
      
            ...state,
            selectedCategory: null,
          })),

          on(categoryActions.loadCategoriesSuccess, (state, {categoryList}) => {
            let isLoadingFromFile = false;
            if(state.isStubs === true)
            {
              isLoadingFromFile = true;
            }
            return{
              ...state,
              categoryList: categoryList,
              selectedCategory: null,
              isLoadCategoriesfromFile: isLoadingFromFile
            }
          }),

          on(categoryActions.loadCategoriesFailure, (state, { error }) => ({
            ...state,
            categoryList: [],
            selectedCategory: null
          })),

          on(categoryActions.updateCategory, (state, { category }) => {
            const update: Partial<Category> & { id: string } = category;
            const updateCategoryList = state.categoryList.map(category => category.id !== update.id ? category : { ...category, ...update });
            return{
              ...state,
              categoryList: updateCategoryList,
              selectedCategory: null
            }
          }),
          on(categoryActions.updateCategorySuccess, (state) => ({
            ...state,
            selectedCategory: null
          })),
          on(categoryActions.updateCategoryFailure, (state, { error }) => ({
            ...state,
            categoryListList: [],
            selectedCategory: null
          })),
          on(categoryActions.createCategory, (state, { category }) => ({
            ...state,
            categoryList: [...state.categoryList, category],
            selectedCategory: null
          })),
          
          on(categoryActions.deleteCategory, (state, { categoryId }) => {
            const updateCategoryList = state.categoryList.filter(obj => obj.id !== categoryId)
            return{
              ...state,
              categoryList: updateCategoryList,
              selectedCategory: null
            }
          }),

    )
})

export const {
  name: categoryFeatureKey, 
  reducer: categoryReducer,
} = categoryFeature