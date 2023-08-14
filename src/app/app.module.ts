import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptor } from './_config/http-error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { GenderPipe } from './_pipe/gender.pipe';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserInfoComponent } from './pages/user/user-info/user-info.component';
import { UserManageComponent } from './pages/sys/user-manage/user-manage.component';
import { CategoryComponent } from './components/category/category.component';
import { UserDetailComponent } from './pages/sys/user-manage/user-detail/user-detail.component';
import { UserWaitComponent } from './pages/sys/user-manage/user-wait/user-wait.component';
import { UserBorrowComponent } from './pages/sys/user-manage/user-borrow/user-borrow.component';
import { UserGivedComponent } from './pages/sys/user-manage/user-gived/user-gived.component';
import { PhieumuonComponent } from './components/phieumuon/phieumuon.component';
import { ProductComponent } from './components/product/product.component';
import { SearchService } from './_service/user/serach.service';
// import { ConvertToSpacesPipe } from 'convert-to-spaces.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GenderPipe,
    // HeaderComponent,
    // FooterComponent,
    // HomeComponent,
    // LoginComponent,
    // RegisterComponent,
    // CartComponent,
    // CheckoutComponent,
    ProductComponent,
    ThankyouComponent,
    UserManageComponent,
    UserDetailComponent,
    UserWaitComponent,
    UserBorrowComponent,
    UserGivedComponent,
    // CartComponent
    // UserInfoComponent,
    // ConvertToSpacesPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    SearchService,

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
