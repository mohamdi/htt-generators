import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RbacDirective} from "./directive/rbac.directive";


@NgModule({
  declarations: [RbacDirective],
  exports: [RbacDirective],
  imports: [
    CommonModule,
  ], providers: [RbacDirective]
})
export class RbacModule {
}
