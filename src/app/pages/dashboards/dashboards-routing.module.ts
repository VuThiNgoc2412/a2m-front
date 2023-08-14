import { ProductComponent } from './../../components/product/product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardsComponent } from './dashboards.component';
import { HomeComponent } from 'app/components/home/home.component';
import { RoleGuard } from 'app/_guard/role.guard';
import { AuthConstant } from 'app/_constant/auth.constant';

const routes: Routes = [

  {path: "", component: DashboardsComponent,
  children: [
    {path: "", component: HomeComponent, },
    {path: "book/:id", component: ProductComponent},
  ],
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardsRoutingModule { }
