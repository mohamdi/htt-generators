import {Component, Input, OnInit} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";

@Component({
  selector: 'app-payment-status-cell-renderer',
  templateUrl: './payment-status-cell-renderer.component.html',
  styleUrls: ['./payment-status-cell-renderer.component.scss']
})
export class PaymentStatusCellRendererComponent implements ICellRendererAngularComp, OnInit {
  @Input()
  status!: any;
  public params: ICellRendererParams;
  value!: any;

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.value = this.params.value;
  }

  ngOnInit(): void {
    if(this.status){
      this.value = this.status;
    }
  }

  refresh(): boolean {
    return false;
  }

}
