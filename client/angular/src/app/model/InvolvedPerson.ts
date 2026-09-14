import {UtilityCostPayment} from './UtilityCostPayment';

export class InvolvedPerson {

  id: string = '';
  name: string = '';
  startOfInvolvement: string = '';
  endOfInvolvement: string = '';
  utilityCostPaymentHistory: UtilityCostPayment[] = [];
}
