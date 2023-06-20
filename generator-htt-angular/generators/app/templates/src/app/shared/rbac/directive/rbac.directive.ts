import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';

@Directive({
    selector: '[hasRole]',
})
export class RbacDirective implements OnInit {
    constructor(private elementRef: ElementRef, private auth: AuthenticationService) {
    }

    private _roles!: string[] | string;

    get roles() {
        return this._roles;
    }

    @Input('hasRole') set roles(r: string[] | string) {
        this._roles = [...r];
    }

    ngOnInit() {
        this.checkAccess();
    }

    checkAccess() {
        const userHasRole: boolean = this.auth.userHasAnyRole([...this.roles]);
        if (!userHasRole) {
            this.elementRef.nativeElement.style.display = 'none';
        }
    }
}
