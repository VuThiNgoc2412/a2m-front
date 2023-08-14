import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { CartComponent } from 'app/components/cart/cart.component';
import { LayoutsModule } from 'app/components/layouts/layouts.module';
import { SharedModule } from 'app/components/shared/shared.module';
import { WaitList } from 'app/_model/user/waitlist.model';
import { WaitListComponent } from 'app/components/waitlist/waitlist.component';
import { NotificationsComponent } from 'app/components/notifications/notifications.component';
import { CartService } from 'app/_service/services/cart.service';
import { User0101Service } from 'app/_service/user/user0101.service';


@NgModule({
  declarations: [
    UserInfoComponent,
    UserComponent,
    CartComponent,
    WaitListComponent,
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    LayoutsModule,
    SharedModule,

  ],
  providers: [User0101Service],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class UserModule { }
