import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './modules/login/login.component';
import {AuthGuard} from "./helpers/auth.guard";

const routes: Routes = [
<% for(entity of entities) {
  var entityName = entity.name.replace(/([a-z])([A-Z])/g, "$1_$2").replace(/[\s_]+/g, '-').toLowerCase();
%>
  {
    path: '<%=entityName%>', canActivate: [AuthGuard],
    loadChildren: () =>
    import('./modules/<%=entityName%>/<%=entityName%>.module').then(mod => mod.<%=entity.name%>Module)
  },
<% } %>

  // {
  //   path: 'users', canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import('./modules/user-management/user-management.module').then(mod => mod.UserManagementModule)
  // },
  // {
  //   path: 'dashboard', canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import('./modules/dashboard/dashboard.module').then(mod => mod.DashboardModule)
  // },
  {path: 'login', component: LoginComponent},
  // {path: 'setup/:token', component: AccountSetupComponent},
  {path: '', pathMatch: 'full', redirectTo: 'dummy'},
  {path: '**', redirectTo: ''},
];

export const appRoutingModule = RouterModule.forRoot(routes);
