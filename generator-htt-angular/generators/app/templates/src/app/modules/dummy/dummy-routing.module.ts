import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {<%=entity.name%>ListComponent} from "./<%=fileName%>-list/<%=fileName%>-list.component";

const routes: Routes = [
  {path: 'list', component: <%=entity.name%>ListComponent},
  {path: '', pathMatch: 'full', redirectTo: 'list'},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class <%=entity.name%>RoutingModule { }
