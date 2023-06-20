import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../services/authentication.service";
import {UserService} from "../../../services/user.service";
import {MenuItem} from "primeng-lts/api";
import {Router} from "@angular/router";
import {navigationItems} from "../../../shared/navigation";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  items: MenuItem[] = [];

  constructor(
    private translate: TranslateService,
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
      this.initMenu();
  }

  initMenu(){
    this.items = navigationItems;
    this.items.forEach(async item => {
      this.translateItems(item);
      if(item.items?.length){
        item.items.forEach(subItem => {
          this.translateItems(subItem);
        })
      }
    });
  }

  async translateItems(item){
    item.label = await this.translate.get(item.label).toPromise();
  }

  logout() {
    this.authService.logout();
  }
}
