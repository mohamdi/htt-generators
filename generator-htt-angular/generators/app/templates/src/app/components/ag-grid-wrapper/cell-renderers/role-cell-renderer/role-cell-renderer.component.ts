import {Component} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";

@Component({
  selector: 'app-role-cell-renderer',
  templateUrl: './role-cell-renderer.component.html',
  styleUrls: ['./role-cell-renderer.component.scss']
})
export class RoleCellRendererComponent implements ICellRendererAngularComp {

  public params: ICellRendererParams;
  value!: any;

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.value = this.params.value;
  }

  refresh(): boolean {
    return false;
  }

}
