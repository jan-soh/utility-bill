import {UtilityCostPayment} from '../../model/utility-cost-payment';

export interface UtilityCostPaymentCreatedObserver {
  utilityCostPaymentCreated(utilityCostPayment: UtilityCostPayment): void;
}
