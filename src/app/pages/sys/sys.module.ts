import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SysRoutingModule } from './sys-routing.module';
import { Sys0201Component } from './Sys0201/sys0201.component';
import { SysComponent } from './sys.component';
import { BookTitleComponent } from 'app/components/bookTitle/booktitlelist/booktitle.component';
import { AddBookTitleComponent } from 'app/components/bookTitle/addbooktitle/addbooktitle.component';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from 'app/components/category/category.component';
import { PhieumuonComponent } from 'app/components/phieumuon/phieumuon.component';

import { CheckoutComponent } from 'app/components/checkout/checkout.component';
import { PhieuMuonComponent } from '../user/phieumuon/phieumuon.component';
import { LayoutsModule } from 'app/components/layouts/layouts.module';
import { SelectRoleComponent } from 'app/components/selectRole/selectRole.component';


@NgModule({
  declarations: [
    SysComponent,
    BookTitleComponent,
    Sys0201Component,
    AddBookTitleComponent,
    AddBookTitleComponent,
    CheckoutComponent,
    PhieuMuonComponent,
    CategoryComponent,
    SelectRoleComponent,
    PhieumuonComponent

  ],
  imports: [
    CommonModule,
    SysRoutingModule,
    FormsModule,
    LayoutsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SysModule { }
