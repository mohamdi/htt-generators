import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Injectable} from "@angular/core";
import {ConfirmDialogComponent} from "../shared/confirm-dialog/confirm-dialog.component";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class ConfirmationDialogService {

    constructor(
      private modalService: NgbModal,
      private translateService: TranslateService
    ) {
    }

    public confirm(
        title: string,
        message: string,
        btnOkText: string = this.translateService.instant('global.confirm'),
        btnCancelText: string = this.translateService.instant('global.cancel'),
        dialogSize: 'sm' | 'lg' | 'md' = 'sm'): Promise<boolean> {
        const modalRef = this.modalService.open(ConfirmDialogComponent, {
          size: dialogSize,
          backdrop: false
        });
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.message = message;
        modalRef.componentInstance.btnOkText = btnOkText;
        modalRef.componentInstance.btnCancelText = btnCancelText;

        return modalRef.result;
    }

}
