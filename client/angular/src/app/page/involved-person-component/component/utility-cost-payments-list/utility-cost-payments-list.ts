import {Component, inject, signal} from '@angular/core';
import {InvolvedPerson} from '../../../../model/InvolvedPerson';
import {UtilityCostPayment} from '../../../../model/UtilityCostPayment';
import {UtilityCostPaymentSubject} from '../../../../observers/utility-cost-payment/UtilityCostPaymentSubject';

@Component({
  selector: 'utility-cost-payments-list',
  styleUrls: ['./utility-cost-payments-list.css'],
  templateUrl: './utility-cost-payments-list.html',
})
export class UtilityCostPaymentsList {

  public readonly utilityCostPaymentSubject = inject(UtilityCostPaymentSubject);

  public involvedPerson = signal<InvolvedPerson | null>(null);
  public paymentHistory = signal<UtilityCostPayment[] | null>([]);

  visible = signal<boolean>(false);

  public add(): void {
  }

  public delete(payment: UtilityCostPayment): void {

  }

  public edit(payment: UtilityCostPayment): void {

  }
}
