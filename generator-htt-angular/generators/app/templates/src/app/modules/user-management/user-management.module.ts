import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import {SharedModule} from "../../shared/shared.module";
import { UserFormComponent } from './user-form/user-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MultiSelectModule} from "primeng-lts/multiselect";


@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MultiSelectModule,
    FormsModule
  ]
})
export class UserManagementModule { }
