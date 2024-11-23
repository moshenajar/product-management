import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/products/product-details/product-details.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryDetailsComponent } from './pages/categories/category-details/category-details.component';

export const routes: Routes = [

    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children: [
            {
                path:'products',
                component: ProductsComponent
            },
            {
                path:'productdetails',
                component: ProductDetailsComponent
            },
            {
                path:'categories',
                component: CategoriesComponent
            },
            {
                path:'categorydetails',
                component: CategoryDetailsComponent
            }
        ]
    }

];

