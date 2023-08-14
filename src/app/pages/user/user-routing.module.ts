// const routes: Routes = [
//     {
//       path: "", component: SamComponent,
//       children: [
//         { path: "", redirectTo: "sam0101", pathMatch: "full" },
//         { path: "sam0101", component: Sam0101Component, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN, AuthConstant.ROLE_NORMAL] } },
//         { path: "sam0201", component: Sam0201Component, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } }
//       ]
//     },
//   ];

import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./user.component";
import { UserInfoComponent } from "./user-info/user-info.component";
import { NgModule } from "@angular/core";
import { AuthConstant } from "app/_constant/auth.constant";
import { RoleGuard } from "app/_guard/role.guard";
import { CartComponent } from "app/components/cart/cart.component";
import { HomeComponent } from "app/components/home/home.component";
import { PhieuMuonComponent } from "./phieumuon/phieumuon.component";
import { Role } from "app/_model/auth/role";
import { WaitList } from "app/_model/user/waitlist.model";
import { WaitListComponent } from "app/components/waitlist/waitlist.component";
import { NotificationsComponent } from "app/components/notifications/notifications.component";
import { ProductComponent } from "app/components/product/product.component";

const routes: Routes = [
    {path: "", component: UserComponent,
    children: [
        {path: 'book/:id', component: ProductComponent}, //cần xem xét lại
        {path: 'home', component: HomeComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_NORMAL]}},
        // {path: "userInfo", component: UserInfoComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN, AuthConstant.ROLE_NORMAL] },
        {path: "userInfo", component: UserInfoComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_NORMAL] }},
    
        // {path: "cart", component: CartComponent, canActivate: [RoleGuard], },
        {path: "cart", component: CartComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_NORMAL] }},
        {path: "borrow", component: PhieuMuonComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_NORMAL] }},
        {path: "waitlist", component: WaitListComponent, canActivate: [RoleGuard], data: {guards: [AuthConstant.ROLE_NORMAL]}},
        {path: "notification", component: NotificationsComponent},
    ]   
    },
   ]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UserRoutingModule { }
  