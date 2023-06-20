import {Component, OnInit} from '@angular/core';
import {GridApi, GridOptions} from "ag-grid-community";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {TranslateService} from "@ngx-translate/core";
import {ConfirmationDialogService} from "../../../services/ConfirmationDialogService";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../../services/user.service";
import {isFirstColumn} from "../../../shared/utils/grid-utils";
import {AG_GRID_LOCALE_FR} from "../../../components/ag-grid-wrapper/ag-grid-i18n/locale.fr";
import {
  RoleCellRendererComponent
} from "../../../components/ag-grid-wrapper/cell-renderers/role-cell-renderer/role-cell-renderer.component";
import {UserFormComponent} from "../user-form/user-form.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  columnDefs!: any[];
  rowData!: any[];
  frameworkComponents: any;
  gridOptions!: GridOptions;
  gridApi!: GridApi;
  localeText: any;
  selectedItem: any;
  private modalRef!: MdbModalRef<UserFormComponent>;

  constructor(
    private modalService: MdbModalService,
    private service: UserService,
    private translate: TranslateService,
    private confirmationService: ConfirmationDialogService,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.initColsConfig();
    this.agGridColumnConfig();
    this.fetchData();
  }

  private fetchData(){
    this.service.getAll()
      .subscribe((data) => {
        this.rowData = data;
      });
  }

  private initColsConfig() {
    this.columnDefs = [
      {
        headerName: this.translate.instant('user.view.fields.lastname'),
        headerClass: 'table-header',
        field: 'firstName',
      },
      {
        headerName: this.translate.instant('user.view.fields.firstname'),
        headerClass: 'table-header',
        field: 'lastName',
      },
      {
        headerName: this.translate.instant('user.view.fields.username'),
        headerClass: 'table-header',
        field: 'username',
      },
      {
        headerName: this.translate.instant('user.view.fields.role'),
        headerClass: 'table-header',
        field: 'role',
        cellRenderer: 'roleCellRenderer'
      },
      {
        headerName: this.translate.instant('user.view.fields.permissions'),
        headerClass: 'table-header',
        field: 'permission',
        valueGetter: (params) => {
          if(params.data.permission)
            return this.translate.instant(`enum.permission.${params.data.permission}`);
        }
      },
      {
        headerName: this.translate.instant('user.view.fields.direction'),
        headerClass: 'table-header',
        field: 'direction.name',
      }
    ];
  }

  showLoading(){
    this.gridApi?.showLoadingOverlay();
  }

  hideLoading(){
    this.gridApi?.hideOverlay();
  }

  gridReady(params: any) {
    this.gridApi = params.api;
  }

  agGridColumnConfig() {
    this.frameworkComponents = {
      roleCellRenderer: RoleCellRendererComponent,
    };
    this.localeText = this.initAgGridLocale();
    this.gridOptions = <GridOptions>{
      rowHeight: 45,
      pagination: true,
      paginationPageSize: 9,
      rowModelType: 'clientSide',
      enableColResize: true,
      enableSorting: false,
      enableFilter: true,
      defaultColDef: {
        filter: 'agTextColumnFilter',
        floatingFilter: true,
        resizable: true,
        flex: 1,
        sortable: true,
        headerCheckboxSelection: false,
        checkboxSelection: isFirstColumn
      },
      columnDefs: this.columnDefs,
      deltaRowDataMode: true,
      getRowNodeId: (data) => {
        return data.id;
      },
    };
  }

  initAgGridLocale() {
    const AG_GRID_LOCAL = {};
    Object.keys(AG_GRID_LOCALE_FR).forEach(function (key) {
      // @ts-ignore
      AG_GRID_LOCAL[key] = AG_GRID_LOCALE_FR[key];
    });
    return AG_GRID_LOCAL;
  }

  openForm(item?: any){
    this.modalRef = this.modalService.open(UserFormComponent, {
      backdrop: true,
      animation: true,
      keyboard: true,
      ignoreBackdropClick: false,
      modalClass: 'center modal-center modal-lg',
      data: {
        itemToUpdate: item
      }
    });
    this.modalRef.onClose.subscribe((response: any) => {
      if (response) {
        this.fetchData();
      }
    });
  }

  view(item){
    this.modalRef = this.modalService.open(UserFormComponent, {
      backdrop: true,
      animation: true,
      keyboard: true,
      ignoreBackdropClick: false,
      modalClass: 'center modal-center modal-lg',
      data: {
        itemToUpdate: item,
        readOnly: true
      }
    });
    this.modalRef.onClose.subscribe((response: any) => {
      if (response) {
        this.fetchData();
      }
    });
  }

  delete(item){
    this.confirmationService.confirm(
      this.translate.instant('user.modal_delete.title'),
      this.translate.instant('user.modal_delete.message'),
      this.translate.instant('global.delete'),
      this.translate.instant('global.cancel'),
      'md'
    )
      .then(data => {
        if(!!data){
          this.service.delete(item.id)
            .subscribe(()=>{
                this.toastr.success(this.translate.instant('user.form.delete_success_message'))
                this.fetchData();
              },
              ()=>{
                this.toastr.error(this.translate.instant('user.form.delete_error_message'))
              });
        }
      })
  }

  onSelectionChanged($event: any) {
    this.selectedItem = this.gridApi.getSelectedRows()[0];
  }

}
