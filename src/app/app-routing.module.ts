import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./component/pages/home/home.component";
import {LoginComponent} from "./component/pages/login/login.component";
import {RegisterComponent} from "./component/pages/register/register.component";
import {ListComponent} from "./component/product/list/list.component";
import {DetailProductComponent} from "./component/product/detail-product/detail-product.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path:'product-detail/:id',
    component:DetailProductComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
