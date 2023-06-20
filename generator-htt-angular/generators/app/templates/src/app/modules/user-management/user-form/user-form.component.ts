import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user";
import {ToastrService} from "ngx-toastr";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "../../../services/user.service";
import {RoleEnum} from "../../../models/role-enum";
import {PermissionEnum} from "../../../models/permission-enum";
import {Direction} from "../../../models/direction";
import {DirectionService} from "../../../services/direction.service";
import {emailRegex, lettersOnlyRegex} from "../../../shared/const";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  itemToUpdate: User;
  readOnly;
  form!: FormGroup
  title = '';
  roles = Object.values(RoleEnum);
  permissions = Object.values(PermissionEnum);
  directions: Direction[] = [];

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private toastr: ToastrService,
    private modalRef: MdbModalRef<UserFormComponent>,
    private translate: TranslateService,
    private directionServie: DirectionService
  ) { }

  ngOnInit(): void {
    this.title = 'user.form.add_title';
    this.initForm()
    if(this.itemToUpdate){
      this.title = 'user.form.update_title';
      this.patchForm();
    }
    this.directionServie.getAll()
      .subscribe((data) => this.directions = data);
  }

  private initForm(){
    this.form = this.fb.group({
      id: this.fb.control(null),
      lastName: this.fb.control(null, [Validators.required, Validators.pattern(lettersOnlyRegex)]),
      firstName: this.fb.control(null, [Validators.required, Validators.pattern(lettersOnlyRegex)]),
      username: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required, Validators.pattern(emailRegex)]),
      role: this.fb.control(null, [Validators.required]),
      direction: this.fb.control(null, [Validators.required]),
      permission: this.fb.control(null, [Validators.required]),
    });
  }

  private patchForm() {
    this.form.patchValue({
      id: this.itemToUpdate?.id,
      lastName: this.itemToUpdate?.lastName,
      firstName: this.itemToUpdate?.firstName,
      email: this.itemToUpdate?.email,
      username: this.itemToUpdate?.username,
      role: this.itemToUpdate?.role,
      direction: this.itemToUpdate?.direction?.id,
      permission: this.itemToUpdate?.permission,
    });
    if(this.readOnly){
      this.form.patchValue({
        permission: this.translate.instant(`enum.permission.${this.itemToUpdate?.permission}`)
      });
    }
  }

  get f(){
    return this.form.controls;
  }

  closeModal(feedback?){
    this.modalRef.close(feedback);
  }

  onSubmit() {
    const successMessage = this.itemToUpdate? 'user.form.update_success_message' : 'user.form.add_success_message';
    const user = this.form.value as User;
    user.direction = this.directions.find(direction => direction.id == this.form.value.direction);
    this.service.save(user)
      .subscribe(() => {
        this.toastr.success(this.translate.instant(successMessage));
        this.closeModal(true);
      },
      (error) => {
        this.toastr.error(error);
      });
  }
}
