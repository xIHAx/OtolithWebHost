import {ModuleWithProviders, NgModule} from '@angular/core'; 
import {Routes, RouterModule} from '@angular/router'; 
import {RegisterComponent} from './register/register.component'; 
import {LoginComponent} from './login/login.component'; 
import {LogoutComponent} from './logout/logout.component'; 
import {AdminComponent} from './admin/admin.component'; 
import {AuthGuard} from './auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { NewsInfoComponent } from './news-info/news-info.component';
import { PostNewsComponent } from './post-news/post-news.component';
import { EditNewsComponent } from './edit-news/edit-news.component';
import { ScannerComponent } from './scanner/scanner.component';
import { UserListComponent } from './user-list/user-list.component';
import { ProgramsComponent } from './programs/programs.component';
import { ProgramInfoComponent } from './program-info/program-info.component';
import { EditProgramComponent } from './edit-program/edit-program.component';
import { PostProgramComponent } from './post-program/post-program.component';
import { ProductsComponent } from './products/products.component';
import { ProductsInfoComponent } from './products-info/products-info.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { OrderListComponent } from './order-list/order-list.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { OrderInfoComponent } from './order-info/order-info.component';
import { ContactComponent } from './contact/contact.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { EmailValidationComponent } from './email-validation/email-validation.component';
import { StaffProjectListComponent } from './staff-project-list/staff-project-list.component';
import { ProgrammesComponent } from './programmes/programmes.component';
import { ProgrammesInfoComponent } from './programmes-info/programmes-info.component';
import { EditProgrammesComponent } from './edit-programmes/edit-programmes.component';
import { AddProgrammesComponent } from './add-programmes/add-programmes.component';
import { ProgramListComponent } from './program-list/program-list.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { StatisticPageComponent } from './statistic-page/statistic-page.component';
import { AboutpageComponent } from './aboutpage/aboutpage.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotUsernameComponent } from './forgot-username/forgot-username.component';

const appRoutes: Routes = [  
    { path: 'register', component:RegisterComponent},  
    { path: 'login', component:LoginComponent},  
    { path: 'logout', component:LogoutComponent},
    { path: 'userProfile', component:UserProfileComponent},
    { path: 'home', component:HomeComponent},
    { path: 'news', component:NewsComponent},
    { path: 'newsInfo/:_id', component:NewsInfoComponent},
    { path: 'postNews', component:PostNewsComponent, canActivate: [AuthGuard], data: {permission: {only: ["staff", "admin"]}}}, 
    { path: 'editNews/:_id', component:EditNewsComponent, canActivate: [AuthGuard], data: {permission: {only: ["staff", "admin"]}}}, 
    { path: 'Scanner', component:ScannerComponent, canActivate: [AuthGuard], data: {permission: {only: ["staff", "admin"]}}},
    { path: 'userList', component:UserListComponent, canActivate: [AuthGuard], data: {permission: {only: ["staff", "admin"]}}},
    { path: 'programs', component:ProgramsComponent},
    { path: 'programInfo/:_id', component:ProgramInfoComponent},
    { path: 'editProgram/:_id', component:EditProgramComponent, canActivate: [AuthGuard], data: {permission: {only: ["staff", "admin"]}}},
    { path: 'postProgram', component:PostProgramComponent, canActivate: [AuthGuard], data: {permission: {only: ["staff", "admin"]}}}, 
    { path: 'products/:type', component:ProductsComponent},
    { path: 'productsInfo/:_id', component:ProductsInfoComponent},
    { path: 'addProducts', component:AddProductsComponent, canActivate: [AuthGuard], data: {permission: {only: ["staff", "admin"]}}}, 
    { path: 'editProducts/:_id', component:EditProductsComponent, canActivate: [AuthGuard], data: {permission: {only: ["staff", "admin"]}}}, 
    { path: 'cart', component:CartComponent},
    { path: 'order', component:OrderComponent},
    { path: 'orderList', component:OrderListComponent, canActivate: [AuthGuard], data: {permission: {only: ["staff", "admin"]}}},
    { path: 'addOrder', component:AddOrderComponent}, 
    { path: 'orderInfo/:_id', component:OrderInfoComponent},
    { path: 'contact', component:ContactComponent},
    { path: 'wishlist', component:WishlistComponent},
    { path: 'accountValidation/:temporaryToken', component:EmailValidationComponent},
    { path: 'staffProjectList', component:StaffProjectListComponent, canActivate: [AuthGuard], data: {permission: {only: ["staff", "admin"]}}},
    { path: 'programmes', component:ProgrammesComponent},
    { path: 'programmesInfo/:_id', component:ProgrammesInfoComponent},
    { path: 'editProgrammes/:_id', component:EditProgrammesComponent, canActivate: [AuthGuard], data: {permission: {only: ["staff", "admin"]}}},
    { path: 'addProgrammes', component:AddProgrammesComponent, canActivate: [AuthGuard], data: {permission: {only: ["staff", "admin"]}}}, 
    { path: 'programList', component:ProgramListComponent, canActivate: [AuthGuard], data: {permission: {only: ["staff", "admin"]}}},
    { path: 'userInfo/:_id', component:UserInfoComponent},
    { path: 'statisticPage', component:StatisticPageComponent, canActivate: [AuthGuard], data: {permission: {only: ["staff", "admin"]}}},
    { path: 'aboutPage', component:AboutpageComponent},
    { path: 'forgotPassword', component:ForgotPasswordComponent},
    { path: 'resetPassword/:passwordToken', component:ResetPasswordComponent},
    { path: 'forgotUsername', component:ForgotUsernameComponent},
    { path: 'admin', component:AdminComponent, canActivate: [AuthGuard], data: {permission: {only: ["admin"]}}},  
    { path: '', component:HomeComponent, pathMatch:'full'} 
];

NgModule({
    imports: [RouterModule.forRoot(appRoutes, {
      onSameUrlNavigation: 'reload'
    })],
    exports: [RouterModule]
  })
 
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes, {
    onSameUrlNavigation: 'reload'
}); 
