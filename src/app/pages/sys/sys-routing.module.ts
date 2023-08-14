
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SysComponent } from './sys.component';
import { CategoryComponent } from 'app/components/category/category.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { UserWaitComponent } from './user-manage/user-wait/user-wait.component';
import { UserBorrowComponent } from './user-manage/user-borrow/user-borrow.component';
import { UserGivedComponent } from './user-manage/user-gived/user-gived.component';
import { AuthConstant } from "app/_constant/auth.constant";
import { RoleGuard } from "app/_guard/role.guard";
import { Sys0201Component } from './Sys0201/sys0201.component';
import { PhieumuonComponent } from "app/components/phieumuon/phieumuon.component";
import { SelectRoleComponent } from "app/components/selectRole/selectRole.component";
const routes: Routes = [
  {
    path: "", component: SysComponent,
    children: [
      { path: "list-dausach", component: Sys0201Component, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
      { path: "list-categories", component: CategoryComponent },
      { path: "list-phieumuon", component: PhieumuonComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
      // {path: 'product', component: ProductComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] }},
      { path: 'selectRole', component: SelectRoleComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
      { path: "user-manage", component: UserManageComponent },
      { path: "user-borrow", component: UserBorrowComponent },
      { path: "user-wait", component: UserWaitComponent },
      { path: "user-gived", component: UserGivedComponent },
    ]
  },

];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysRoutingModule { }
