import {Component, OnInit} from '@angular/core';
import {GridApi, GridOptions} from "ag-grid-community";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {TranslateService} from "@ngx-translate/core";
import {<%=entity.name%>ViewComponent} from "../<%=fileName%>-view/<%=fileName%>-view.component";
import {isFirstColumn} from "../../../shared/utils/grid-utils";
import {AG_GRID_LOCALE_FR} from "../../../components/ag-grid-wrapper/ag-grid-i18n/locale.fr";
import Utils from "../../../shared/utils/utils";
import {<%=entity.name%>Service} from "../../../services/<%=fileName%>.service";
import {<%=entity.name%>FormComponent} from "../<%=fileName%>-form/<%=fileName%>-form.component";
import {ToastrService} from "ngx-toastr";
import {ConfirmationDialogService} from "../../../services/ConfirmationDialogService";

@Component({
  selector: 'app-<%=fileName%>-list',
  templateUrl: './<%=fileName%>-list.component.html',
  styleUrls: ['./<%=fileName%>-list.component.scss']
})
export class <%=entity.name%>ListComponent implements OnInit {
  columnDefs!: any[];
  rowData!: any[];
  frameworkComponents: any;
  gridOptions!: GridOptions;
  gridApi!: GridApi;
  localeText: any;
  selectedItem: any;

  private modalRef!: MdbModalRef<<%=entity.name%>ViewComponent>;

  constructor(
    private modalService: MdbModalService,
    private service: <%=entity.name%>Service,
    private translate: TranslateService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {
    this.initColsConfig();
    this.agGridColumnConfig();
    this.fetchData();
  }

  private initColsConfig() {
    this.columnDefs = [
      <% for(field of entity.fields) {%>
      {
        headerName: this.translate.instant('<%=fileName%>.view.fields.<%=field.name%>'),
        headerClass: 'table-header',
        field: '<%=field.name%>', <% if(field.type == 'LocalDate' || field.type == 'LocalDateTime') {%>
        valueGetter: (params) => {
          if(!params.data.<%=field.name%>) return '';
          return Utils.formDate(params.data.<%=field.name%>);
        }<%}%>
      },<%}
      relationships.forEach(relation => {%>
      {
        headerName: this.translate.instant('<%=fileName%>.view.fields.<%=relation.fk_name%>'),
        headerClass: 'table-header',
        field: '<%=relation.fk_name%>',
      },
      <% }); %>
    ];
  }

  private fetchData(){
    this.service.getAll()
      .subscribe((data) => this.rowData = data);
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
    this.frameworkComponents = {};
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

  onSelectionChanged($event: any) {
    this.selectedItem = this.gridApi.getSelectedRows()[0];
  }

  view(){
    this.modalRef = this.modalService.open(<%=entity.name%>FormComponent, {
      backdrop: true,
      animation: true,
      keyboard: true,
      ignoreBackdropClick: false,
      modalClass: 'center modal-center modal-xl',
      data: {
        item: this.selectedItem,
        readOnly: true
      }
    });
    this.modalRef.onClose.subscribe((response: any) => {
      if (response) {
        this.fetchData();
      }
    });
  }

  openForm(item?: any){
    this.modalRef = this.modalService.open(<%=entity.name%>FormComponent, {
      backdrop: true,
      animation: true,
      keyboard: true,
      ignoreBackdropClick: false,
      modalClass: 'center modal-center modal-xl',
      data: {
        item: item
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
      this.translate.instant('<%=fileName%>.modal_delete.title'),
      this.translate.instant('<%=fileName%>.modal_delete.message'),
      this.translate.instant('global.delete'),
      this.translate.instant('global.cancel'),
      'md'
    )
      .then(data => {
        if(!!data){
          this.service.delete(item.id)
            .subscribe(()=>{
                this.toastr.success(this.translate.instant('<%=fileName%>.form.delete_success_message'))
                this.fetchData();
              },
              ()=>{
                this.toastr.error(this.translate.instant('<%=fileName%>.form.delete_error_message'))
              });
        }
      })
  }

}
