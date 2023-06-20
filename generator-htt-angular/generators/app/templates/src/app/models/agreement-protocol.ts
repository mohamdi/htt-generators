import {PaymentStatus} from "./enumeration/payment-status";
import {DueDate} from "./due-date";

export class AgreementProtocol{
  id?: number;
  name?: string;
  conventionDate?: Date;
  applicantName?: string;
  totalAdvanceAmount?: number;
  amountReleaseDate?: Date;
  increaseAmount?: number;
  debitAccount?: string[];
  amountToPay?: number;
  paymentTerm?: Date;
  paymentStatus?: PaymentStatus;
  dueDates?: DueDate[];
  amountPaid?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
