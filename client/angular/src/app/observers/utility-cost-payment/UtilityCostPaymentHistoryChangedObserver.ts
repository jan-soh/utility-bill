import {UtilityCostPayment} from '../../model/UtilityCostPayment';

export interface UtilityCostPaymentHistoryChangedObserver {
  utilityCostPaymentHistoryChanged(utilityCostPaymentHistory: UtilityCostPayment[]): void;
}
