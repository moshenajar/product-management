import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as fromProductStore from './pages/products/store/product/product.reducer';
import * as fromProductEffects from './pages/products/store/product/product.effects';
import { productReducer } from './pages/products/store/product/product.reducer';

import * as fromCategoryStore from './pages/categories/store/category/category.reducer';
import * as fromCategoryEffects from './pages/categories/store/category/category.effects';
import { categoryReducer } from './pages/categories/store/category/category.reducer';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), provideClientHydration(), 
    provideHttpClient(), 
    provideStore(),
    provideState(fromProductStore.productFeatureKey, productReducer),
    provideState(fromCategoryStore.categoryFeatureKey, categoryReducer),
    provideEffects(fromProductEffects,fromCategoryEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
