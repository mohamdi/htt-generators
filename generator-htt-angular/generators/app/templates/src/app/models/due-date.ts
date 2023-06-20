import {AgreementProtocol} from "./agreement-protocol";
import {PaymentStatus} from "./enumeration/payment-status";

export class DueDate{
  id: number;
  dueDateOrder: number;
  dueDate: Date;
  increase: number;
  amount: number;
  paymentStatus: PaymentStatus;
  agreementProtocol: AgreementProtocol;
  createdAt: Date;
  updatedAt: Date;
}
