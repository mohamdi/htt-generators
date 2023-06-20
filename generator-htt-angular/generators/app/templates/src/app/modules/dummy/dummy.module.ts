import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from "../../shared/shared.module";
import { <%=entity.name%>ListComponent } from './<%=fileName%>-list/<%=fileName%>-list.component';
import { <%=entity.name%>ViewComponent } from './<%=fileName%>-view/<%=fileName%>-view.component';
import { <%=entity.name%>FormComponent } from "./<%=fileName%>-form/<%=fileName%>-form.component";
import { <%=entity.name%>RoutingModule } from "./<%=fileName%>-routing.module";


@NgModule({
  declarations: [
    <%=entity.name%>ListComponent,
    <%=entity.name%>ViewComponent,
    <%=entity.name%>FormComponent
  ],
  imports: [
    CommonModule,
    <%=entity.name%>RoutingModule,
    SharedModule
  ]
})
export class <%=entity.name%>Module { }
