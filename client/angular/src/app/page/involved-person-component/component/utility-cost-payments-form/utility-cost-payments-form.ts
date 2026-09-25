import {Component, computed, inject, signal} from '@angular/core';
import {UtilityCostPayment} from '../../../../model/UtilityCostPayment';
import {InvolvedPersonStore} from '../../../../store/InvolvedPersonStore';
import {UtilityCostPaymentStore} from '../../../../store/UtilityCostPaymentStore';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'utility-cost-payments-form',
  styleUrl: './utility-cost-payments-form.css',
  templateUrl: './utility-cost-payments-form.html',
  imports: [FormsModule],
})
export class UtilityCostPaymentsForm {

  readonly paymentStore: UtilityCostPaymentStore = inject(UtilityCostPaymentStore);
  readonly personStore: InvolvedPersonStore = inject(InvolvedPersonStore);

  readonly visible = computed(() => this.paymentStore.hasSelectedPayment());

  private readonly _localError = signal<string | null>(null);

  readonly errorSignal = computed(() => {
    if (this._localError()) {
      return this._localError();
    } else if (this.paymentStore.error()) {
      return this.paymentStore.error();
    }
    return null;
  });

  public save(): void {

    const payment = this.paymentStore.selectedPayment();

    if (this.isValidForCreate(payment)) {

      this.paymentStore.create(payment);
    }
  }

  private isValidForCreate(utilityCostPayment: UtilityCostPayment | null): utilityCostPayment is UtilityCostPayment {

    if (!utilityCostPayment) {
      console.error('utilityCostPayment is null');
      this._localError.set('This utility cost payment can not be created.');
      return false;
    }

    if (!utilityCostPayment.involvedPersonId) {
      this._localError.set('Link to involved person is missing');
      return false;
    }
    if (!utilityCostPayment.amount) {
      this._localError.set('Amount is required');
      return false;
    }
    if (!utilityCostPayment.validFrom) {
      this._localError.set('Valid from is required');
      return false;
    }

    return true;
  }

  public edit(): void {

    const utilityCostPayment = this.paymentStore.selectedPayment();

    if (this.isValidForUpdate(utilityCostPayment)) {
      this.paymentStore.update(utilityCostPayment);
    }
  }

  private isValidForUpdate(utilityCostPayment: UtilityCostPayment | null): utilityCostPayment is UtilityCostPayment {

    const isValidForSave = this.isValidForCreate(utilityCostPayment);

    if (!isValidForSave) {
      return false;
    }

    if (!utilityCostPayment?.id) {
      console.error('utilityCostPayment.id is null');
      this._localError.set('This utility cost payment can not be updated.');
      return false;
    }

    return true;
  }
}
