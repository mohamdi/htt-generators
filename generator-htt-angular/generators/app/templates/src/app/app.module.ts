import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {appRoutingModule} from './app.routing';
import {AppComponent} from './app.component';
import {LoginComponent} from './modules/login/login.component';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {ErrorInterceptor} from './helpers/error.interceptor';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {ConfirmDialogComponent} from "./shared/confirm-dialog/confirm-dialog.component";
import {ConfirmationDialogService} from "./services/ConfirmationDialogService";
import {RbacModule} from "./shared/rbac/rbac.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from 'ngx-toastr';
import {SideBarComponent} from './components/layout/side-bar/side-bar.component';
import {TopBarComponent} from './components/layout/top-bar/top-bar.component';
import {MdbModalModule} from "mdb-angular-ui-kit/modal";
import {CustomToastComponent} from "./components/custom-toast/custom-toast.component";
import {PanelMenuModule} from "primeng-lts/panelmenu";
import { RoleCellRendererComponent } from './components/ag-grid-wrapper/cell-renderers/role-cell-renderer/role-cell-renderer.component';
import { AccountSetupComponent } from './modules/account-setup/account-setup.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);

}

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        RbacModule,
        appRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        ToastrModule.forRoot({
            timeOut: 50000,
            toastComponent: CustomToastComponent
        }),
        TranslateModule.forRoot(
            {
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient]
                }
            }
        ),
        NgbModule,
        MdbModalModule,
        PanelMenuModule,
    ],
  declarations: [
    AppComponent,
    LoginComponent,
    ConfirmDialogComponent,
    SideBarComponent,
    TopBarComponent,
    CustomToastComponent
,
    RoleCellRendererComponent
,
    AccountSetupComponent  ],
    exports: [
        TranslateModule
    ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ConfirmationDialogService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
