import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Category } from "../../../interface/category";

export const categoryActions = createActionGroup({
    source: 'category',
    events: {
        resetCategory: emptyProps(),
        setSelectCategory: props<{ category:Category }>(),

        loadCategories : emptyProps(),
        'loadCategories success': props<{ categoryList: Category[] }>(),
        'loadCategories Failure': props<{ error: any }>(), 

        UpdateCategory: props<{ category:Category}>(),
        'UpdateCategory success': emptyProps(),
        'UpdateCategory failure': props<{ error: any }>(), 

        CreateCategory: props<{ category:Category}>(),
        'CreateCategory success': emptyProps(),
        'CreateCategory failure': props<{ error: any }>(),

        DeleteCategory: props<{ categoryId: string}>(),
        'DeleteCategory success': emptyProps(),
        'DeleteCategory failure': props<{ error: any }>(),
    },
})