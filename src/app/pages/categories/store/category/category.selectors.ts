import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCategory from "./category.reducer";

const selectCategoryFeature = createFeatureSelector<fromCategory.CategoryState>(
    fromCategory.categoryFeatureKey
);

export const selectIsLoadCategoriesfromFile = createSelector(
    selectCategoryFeature, 
    (state: fromCategory.CategoryState) => state.isLoadCategoriesfromFile
);

export const selectCategories = createSelector(
    selectCategoryFeature,
    (state: fromCategory.CategoryState) => state.categoryList
  );

  export const selectedCategory = createSelector(
    selectCategoryFeature, 
    (state) => state.selectedCategory
);