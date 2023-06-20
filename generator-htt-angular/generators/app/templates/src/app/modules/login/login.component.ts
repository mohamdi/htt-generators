import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication.service';
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../services/user.service";

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    returnUrl!: string;
    wrongPassword =false;
    isPasswordVisible = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private toastr: ToastrService,
        private userService: UserService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.tokenValue) {
            this.router.navigate(['/']);
        }
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService
            .login(this.f['username'].value, this.f['password'].value)
            .pipe(first())
            .subscribe(
                (data) => {
                  this.userService.getConnectedUser()
                    .subscribe(user => {
                      // const items = getUserMenu(user);
                      //   if(items.length !== 1){
                      //     this.router.navigate(['/']);
                      //     return;
                      //   }
                      //   items[0].routerLink?
                      //     this.router.navigateByUrl(items[0].routerLink):
                      //     this.router.navigateByUrl(items[0].items[0]?.routerLink);
                      // location.reload();
                    });
                },
                (error) => {
                  this.wrongPassword =true;
                  this.loading = false;
                  setTimeout(()=>{
                    this.wrongPassword = false;
                  }, 5000);

                }
            );
    }
}
