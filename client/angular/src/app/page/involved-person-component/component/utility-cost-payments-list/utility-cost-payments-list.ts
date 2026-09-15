import {Component, inject, signal} from '@angular/core';
import {InvolvedPerson} from '../../../../model/InvolvedPerson';
import {UtilityCostPayment} from '../../../../model/UtilityCostPayment';
import {UtilityCostPaymentSubject} from '../../../../observers/utility-cost-payment/UtilityCostPaymentSubject';
import {InvolvedPersonSubject} from '../../../../observers/involved-person/InvolvedPersonSubject';
import {
  UtilityCostPaymentCreatedObserver
} from '../../../../observers/utility-cost-payment/UtilityCostPaymentCreatedObserver';
import {InvolvedPersonCreatedObserver} from '../../../../observers/involved-person/InvolvedPersonCreatedObserver';

@Component({
  selector: 'utility-cost-payments-list',
  styleUrls: ['./utility-cost-payments-list.css'],
  templateUrl: './utility-cost-payments-list.html',
})
export class UtilityCostPaymentsList implements UtilityCostPaymentCreatedObserver, InvolvedPersonCreatedObserver {

  public readonly utilityCostPaymentSubject = inject(UtilityCostPaymentSubject);
  public readonly involvedPersonSubject = inject(InvolvedPersonSubject);

  public involvedPerson = signal<InvolvedPerson | null>(null);
  public paymentHistory = signal<UtilityCostPayment[]>([]);

  visible = signal<boolean>(false);

  constructor() {
    this.utilityCostPaymentSubject.registerUtilityCostPaymentCreatedObserver(this);
    this.involvedPersonSubject.registerInvolvedPersonCreatedObserver(this);
  }

  public add(): void {
  }

  public delete(payment: UtilityCostPayment): void {

  }

  public edit(payment: UtilityCostPayment): void {

  }

  public utilityCostPaymentCreated(utilityCostPayment: UtilityCostPayment): void {
    this.paymentHistory.update((payments) => [...payments, utilityCostPayment]);
    this.paymentHistory().sort((a, b) => new Date(a.validFrom).getDate() - new Date(b.validFrom).getDate());
    this.visible.set(true);
  }

  public utilityCostPaymentCreatedError(errorMessage: string): void {
    // nothing to do yet
  }

  public involvedPersonCreated(involvedPerson: InvolvedPerson): void {
    this.involvedPerson.set(involvedPerson);
  }

  public involvedPersonCreatedError(error: string): void {
    // nothing to do yet
  }
}
