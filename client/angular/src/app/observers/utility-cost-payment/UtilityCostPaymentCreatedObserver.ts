import {UtilityCostPayment} from '../../model/UtilityCostPayment';

export interface UtilityCostPaymentCreatedObserver {
  utilityCostPaymentCreated(utilityCostPayment: UtilityCostPayment): void;

  utilityCostPaymentCreatedError(errorMessage: string): void;
}
