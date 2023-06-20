import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgGridModule} from "ag-grid-angular";
import {TranslateModule} from "@ngx-translate/core";
import {InputOnlyNumberDirective} from "./input-only-number.directive";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    InputOnlyNumberDirective
  ],
  imports: [
    CommonModule,
    AgGridModule,
    TranslateModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [
    AgGridModule,
    TranslateModule,
    InputOnlyNumberDirective,
    NgbModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
