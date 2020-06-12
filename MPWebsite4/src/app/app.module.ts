import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostsService } from './posts.service';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminComponent } from './admin/admin.component';
import { routing } from './app.routing';
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { AuthService } from './auth.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { NewsInfoComponent } from './news-info/news-info.component';
import { PostNewsComponent } from './post-news/post-news.component';
import { EditNewsComponent } from './edit-news/edit-news.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScannerComponent } from './scanner/scanner.component';
import { UserListComponent } from './user-list/user-list.component';
import { NgxQRCodeModule } from "ngx-qrcode2";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { NgxPaginationModule } from 'ngx-pagination';
import { ProgramsComponent } from './programs/programs.component';
import { ProgramInfoComponent } from './program-info/program-info.component';
import { PostProgramComponent } from './post-program/post-program.component';
import { EditProgramComponent } from './edit-program/edit-program.component';
import { ProductsComponent } from './products/products.component';
import { ProductsInfoComponent } from './products-info/products-info.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { OrderListComponent } from './order-list/order-list.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { OrderInfoComponent } from './order-info/order-info.component';
import { ConnectionService } from './connection.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { ContactComponent } from './contact/contact.component';
import { NgxStripeModule } from 'ngx-stripe';
import { WishlistComponent } from './wishlist/wishlist.component';
import { EmailValidationComponent } from './email-validation/email-validation.component';
import { StaffProjectListComponent } from './staff-project-list/staff-project-list.component';
import { PasswordStrengthBarComponent } from './password-strength-bar/password-strength-bar.component';  
import { ProgrammesComponent } from './programmes/programmes.component';
import { ProgrammesInfoComponent } from './programmes-info/programmes-info.component';
import { EditProgrammesComponent } from './edit-programmes/edit-programmes.component';
import { AddProgrammesComponent } from './add-programmes/add-programmes.component';
import { ProgramListComponent } from './program-list/program-list.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { NgxPrintModule } from 'ngx-print';
import { AboutpageComponent } from './aboutpage/aboutpage.component';
import { DisqusModule } from "ngx-disqus";
import { StatisticPageComponent } from './statistic-page/statistic-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutpageComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AdminComponent,
    UserProfileComponent,
    HomeComponent,
    NewsComponent,
    NewsInfoComponent,
    PostNewsComponent,
    EditNewsComponent,
    ScannerComponent,
    UserListComponent,
    ProgramsComponent,
    ProgramInfoComponent,
    PostProgramComponent,
    EditProgramComponent,
    ProductsComponent,
    ProductsInfoComponent,
    AddProductsComponent,
    EditProductsComponent,
    CartComponent,
    OrderComponent,
    OrderListComponent,
    OrderInfoComponent,
    AddOrderComponent,
    OrderInfoComponent,
    ContactComponent,
    WishlistComponent,
    EmailValidationComponent,
    StaffProjectListComponent,
    PasswordStrengthBarComponent,
    ProgrammesComponent,
    ProgrammesInfoComponent,
    EditProgrammesComponent,
    AddProgrammesComponent,
    ProgramListComponent,
    UserInfoComponent,
    StatisticPageComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  
    ],
  imports: [
    
    BrowserModule,
    routing,  
    ReactiveFormsModule,  
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    NgxPrintModule,
    NgxStripeModule.forRoot('pk_test_ZO2d41UgD8lu835QAjU8vjew00iJYLcNBk'),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    }),
    BrowserAnimationsModule,
    ZXingScannerModule,
    NgxQRCodeModule,
    DisqusModule.forRoot('otolith'),
  ],
  providers: [AuthService,PostsService,ConnectionService],
  bootstrap: [AppComponent]
})
export class AppModule {}
