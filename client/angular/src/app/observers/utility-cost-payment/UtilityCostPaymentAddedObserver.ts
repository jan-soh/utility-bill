import {UtilityCostPayment} from '../../model/UtilityCostPayment';

export interface UtilityCostPaymentAddedObserver {
  utilityCostPaymentAdded(utilityCostPayment: UtilityCostPayment): void;
}
