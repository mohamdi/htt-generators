import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {TranslateService} from "@ngx-translate/core";
import {<%=entity.name%>} from "../../../models/<%=fileName%>";
import {<%=entity.name%>Service} from "../../../services/<%=fileName%>.service";
import Utils from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-<%=fileName%>-form',
  templateUrl: './<%=fileName%>-form.component.html',
  styleUrls: ['./<%=fileName%>-form.component.scss']
})
export class <%=entity.name%>FormComponent implements OnInit {

  item: <%=entity.name%>;
  readOnly;
  form!: FormGroup
  title: string;

  constructor(
    private fb: FormBuilder,
    private service: <%=entity.name%>Service,
    private toastr: ToastrService,
    private modalRef: MdbModalRef<<%=entity.name%>FormComponent>,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.setTitle();
  }

  setTitle() {
    this.title = `<%=fileName%>.form.title_add`;
    if(this.item){
      this.title = `<%=fileName%>.form.title_update`;
      this.patchForm();
    }
    if(this.readOnly){
      this.title = `<%=fileName%>.form.title_view`;
    }
  }

  private initForm(){
    this.form = this.fb.group({
      id: this.fb.control(null), <%for(field of entity.fields) {%>
      <%=field.name%>: this.fb.control(null), <%}
    relationships.forEach(relation => {%>
      <%=relation.fk_name%>: this.fb.control(null), <% }); %>
    });
  }

  private patchForm() {
    this.form.patchValue({
      id: this.item.id, <% for(field of entity.fields) {switch(field.type){case 'LocalDate': case 'LocalDateTime': %>
      <%=field.name%>: Utils.dateToDatePickerDate(this.item.<%=field.name%>),<% break; %>
      <%default: %>
      <%=field.name%>: this.item.<%=field.name%>,<%break;}}
    relationships.forEach(relation => {%>
      <%=relation.fk_name%>: this.item.<%=relation.fk_name%>, <% });%>
    });
  }

  get f(){
    return this.form.controls;
  }

  async onSubmit(){
    const data = this.form.value as <%=entity.name%>;
    const formTypeI18n = this.item ? 'update':'add';
    this.service.save(data)
      .subscribe(() => {
          this.form.reset();
          this.toastr.success(this.translate.instant(`<%=fileName%>.form.${formTypeI18n}_success_message`))
          this.modalRef.close(true);
        },
      () => {
        this.toastr.error(this.translate.instant(`<%=fileName%>.form.${formTypeI18n}_error_message`))
      });
  }

  closeModal(){
    this.modalRef.close();
  }
}
