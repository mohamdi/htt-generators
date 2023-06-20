import {PaymentMethod} from "./enumeration/payment-method";
import {PaymentStatus} from "./enumeration/payment-status";

export class CreditLetter{
  id?: number;
  reference?: string;
  creationDate?: Date;
  beneficiaryName?: string;
  amount?: number;
  profitDeadline?: Date;
  debitAccount?: string;
  paymentMethod?: PaymentMethod;
  paymentProofCopyPath?: string;
  paymentProofReference?: string;
  paymentStatus?: PaymentStatus;
  IsConsumed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
