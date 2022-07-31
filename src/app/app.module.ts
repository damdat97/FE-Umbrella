import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from "./component/pages/login/login.component";
import {RegisterComponent} from "./component/pages/register/register.component";
import {HomeComponent} from "./component/pages/home/home.component";
import {FooterComponent} from "./component/blocks/footer/footer.component";
import {NavbarComponent} from "./component/blocks/navbar/navbar.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { JwtInterceptor } from './helper/jwt-interceptor';
import {ErrorInterceptor} from "./helper/error-interceptor";
import { HeaderComponent } from './component/blocks/header/header.component';
import { ListComponent } from './component/product/list/list.component';
import { DetailProductComponent } from './component/product/detail-product/detail-product.component';
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {NewProductComponent} from "./component/product/new-product/new-product.component";
import { CreateProductComponent } from './component/product/create-product/create-product.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NewProductComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    HeaderComponent,
    AppComponent,
    ListComponent,
    DetailProductComponent,
    CreateProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor, multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
