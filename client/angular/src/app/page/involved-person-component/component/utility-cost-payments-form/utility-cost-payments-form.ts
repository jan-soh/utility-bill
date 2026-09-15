import {Component, inject, signal} from '@angular/core';
import {InvolvedPersonSubject} from '../../../../observers/involved-person/InvolvedPersonSubject';
import {InvolvedPerson} from '../../../../model/InvolvedPerson';
import {UtilityCostPayment} from '../../../../model/UtilityCostPayment';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InvolvedPersonCreatedObserver} from '../../../../observers/involved-person/InvolvedPersonCreatedObserver';
import {
  UtilityCostPaymentCreatedObserver
} from '../../../../observers/utility-cost-payment/UtilityCostPaymentCreatedObserver';
import {
  UtilityCostPaymentAddedObserver
} from '../../../../observers/utility-cost-payment/UtilityCostPaymentAddedObserver';
import {UtilityCostPaymentSubject} from '../../../../observers/utility-cost-payment/UtilityCostPaymentSubject';

@Component({
  selector: 'utility-cost-payments-form',
  styleUrl: './utility-cost-payments-form.css',
  templateUrl: './utility-cost-payments-form.html',
  imports: [NgIf, FormsModule],
})
export class UtilityCostPaymentsForm implements InvolvedPersonCreatedObserver, UtilityCostPaymentAddedObserver, UtilityCostPaymentCreatedObserver {

  private readonly involvedPersonSubject: InvolvedPersonSubject = inject(InvolvedPersonSubject);
  private readonly utilityCostPaymentSubject: UtilityCostPaymentSubject = inject(UtilityCostPaymentSubject);

  visible = signal<boolean>(false);
  saving: boolean = false;

  involvedPerson = signal<InvolvedPerson | null>(null);
  utilityCostPayment = signal<UtilityCostPayment | null>(null);

  errorMessage = signal<string | null>(null);
  actionMessage = signal<string | null>(null);


  constructor() {

    this.involvedPersonSubject.registerInvolvedPersonCreatedObserver(this);
    this.utilityCostPaymentSubject.registerUtilityCostPaymentAddedObserver(this);
    this.utilityCostPaymentSubject.registerUtilityCostPaymentCreatedObserver(this);
  }

  public involvedPersonCreated(involvedPerson: InvolvedPerson): void {
    this.visible.set(true);
  }

  public involvedPersonCreatedError(error: string): void {
    // nothing to do here
  }

  public utilityCostPaymentAdded(utilityCostPayment: UtilityCostPayment): void {
    this.utilityCostPayment.set(utilityCostPayment);
  }

  public utilityCostPaymentCreated(utilityCostPayment: UtilityCostPayment): void {
    this.visible.set(false);
  }

  public utilityCostPaymentCreatedError(errorMessage: string): void {
    this.errorMessage.set(errorMessage);
  }

  public save(): void {

    if (this.isValidForSave()) {

      this.saving = true;
      this.utilityCostPaymentSubject.createUtilityCostPayment();
    }
  }

  private isValidForSave(): boolean {

    const utilityCostPayment = this.utilityCostPayment();

    if (!utilityCostPayment) {
      return false;
    }

    if (!utilityCostPayment.amount) {
      this.actionMessage.set('Amount is required');
      return false;
    }
    if (!utilityCostPayment.validFrom) {
      this.actionMessage.set('Valid from is required');
      return false;
    }

    return true;
  }

  public reset(): void {
    this.actionMessage.set(null);
  }
}
