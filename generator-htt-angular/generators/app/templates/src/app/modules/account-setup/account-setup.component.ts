import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../models/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {passwordRegex} from "../../shared/const";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-account-setup',
  templateUrl: './account-setup.component.html',
  styleUrls: ['./account-setup.component.scss']
})
export class AccountSetupComponent implements OnInit {

  user: User;
  isPasswordVisible = false;
  form: FormGroup;
  passwordsMatch = true;
  private token: any;
  submitted = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    if(this.authService.tokenValue){
      this.router.navigate(['login']);
    }
    this.token = this.route.snapshot.params['token'];
    this.initForm();
    this.authService.findByToken(this.token)
      .subscribe((data) => this.user = data,
        ()=>{
          this.toastr.error(this.translate.instant('account_setup.token_error'));
        });
  }

  initForm(){
    this.form = this.fb.group({
      password: this.fb.control(null, [Validators.required, Validators.pattern(passwordRegex), Validators.minLength(6), Validators.maxLength(12)]),
      passwordConfirmation: this.fb.control(null, [Validators.required, Validators.pattern(passwordRegex), Validators.minLength(6), Validators.maxLength(12)])
    });
    this.form.valueChanges.subscribe((val) => {
      if(val?.password == val?.passwordConfirmation){
        this.passwordsMatch = true;
        return;
      }
      this.passwordsMatch = false;
    });
  }

  get f(){
    return this.form.controls;
  }

  toggleIsVisible(){
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    this.submitted = true;
    if(this.form.invalid) return;
    this.loading = true;
    this.authService.setUpAccount(this.token, this.form.value.password)
      .subscribe(() => {
        this.router.navigate(['login']);
      },
      () =>{
        this.loading = false;
      });
}
}
