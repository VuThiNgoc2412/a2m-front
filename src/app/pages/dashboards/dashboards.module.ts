import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { DashboardsComponent } from './dashboards.component';
import { HomeComponent } from 'app/components/home/home.component';
import { LayoutsModule } from 'app/components/layouts/layouts.module';
import { SharedModule } from 'app/components/shared/shared.module';
import { ProductComponent } from 'app/components/product/product.component';
import { NotificationsComponent } from 'app/components/notifications/notifications.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardsComponent,
    HomeComponent,
    // ProductComponent,
  ],
  imports: [
    CommonModule,
    DashboardsRoutingModule,
    LayoutsModule,
    SharedModule, 
    FormsModule,
  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class DashboardsModule { }
