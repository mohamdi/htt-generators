import {CreditType} from "./enumeration/credit-type";

export class Treaty{
  id?: number;
  submissionReference?: string;
  draftReference?: string;
  payingParty?: string;
  bank?: string;
  dueDate?: Date;
  draftAmount?: number;
  decision?: string;
  submissionDate?: Date;
  globalAmount?: number;
  validityDateLimit?: Date;
  NIF?: string;
  requestDate?: Date;
  emissionDate?: Date;
  avalDate?: Date;
  pecDate?: Date;
  BCMSentDate?: Date;
  edgeNumber?: number;
  status?: string;
  creditType?: CreditType;
  createdAt?: Date;
  updatedAt?: Date;
}
