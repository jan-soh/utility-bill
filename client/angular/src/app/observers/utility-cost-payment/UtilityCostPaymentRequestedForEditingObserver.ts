import {UtilityCostPayment} from '../../model/UtilityCostPayment';

export interface UtilityCostPaymentRequestedForEditingObserver {
  utilityCostPaymentRequestedForEditing(utilityCostPayment: UtilityCostPayment): void;
}
