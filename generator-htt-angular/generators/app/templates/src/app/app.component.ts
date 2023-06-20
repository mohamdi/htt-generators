import {Component, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';
import {Token} from './models/user';
import {TranslateService} from '@ngx-translate/core';


@Component({selector: 'app', styleUrls: ['app.component.scss'], templateUrl: 'app.component.html'})
export class AppComponent {

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: any) {
    if(event.key == ';') event.preventDefault();
  }

    token!: Token;
    currentYear: string;

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                translate: TranslateService
    ) {
        this.authenticationService.token.subscribe(x => {
          this.token = x;
          if(!this.token) { this.router.navigate(['/login']); }
        });
        translate.addLangs(['fr']);
        translate.setDefaultLang('fr');
        translate.use('fr');
        this.currentYear = new Date().getFullYear().toString();
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
