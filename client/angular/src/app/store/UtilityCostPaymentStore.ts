import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {UtilityCostPaymentService} from '../service/UtilityCostPaymentService';
import {InvolvedPerson} from '../model/InvolvedPerson';
import {InvolvedPersonStore} from './InvolvedPersonStore';
import {UtilityCostPayment} from '../model/UtilityCostPayment';

@Injectable({providedIn: 'root'})
export class UtilityCostPaymentStore {

  private readonly involvedPersonStore = inject(InvolvedPersonStore);
  private readonly service = inject(UtilityCostPaymentService);

  private readonly _paymentHistory = signal<UtilityCostPayment[]>([]);
  private readonly _selectedPayment = signal<UtilityCostPayment | null>(null);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly paymentHistory = this._paymentHistory.asReadonly();
  readonly selectedPayment = this._selectedPayment.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly hasError = computed(() => this._error() !== null);
  readonly hasSelectedPayment = computed(() => this._selectedPayment() !== null);
  readonly hasPaymentHistory = computed(() => this._paymentHistory().length > 0);

  constructor() {
    effect(() => {
      const person = this.involvedPersonStore.selectedPerson();
      if (person) {
        this.loadHistory(person);
      } else {
        this._paymentHistory.set([]);
      }
    });
  }

  private loadHistory(involvedPerson: InvolvedPerson): void {
    this._isLoading.set(true);
    this.service.getHistoryByInvolvedPerson(involvedPerson.id).subscribe({
      next: payments => {
        this._paymentHistory.set(payments);
        this._isLoading.set(false);
      },
      error: () => {
        this._error.set('Failed to load payments.');
        this._isLoading.set(false);
      }
    });
  }

  add(involvedPerson: InvolvedPerson) {
    const payment = new UtilityCostPayment();
    payment.involvedPersonId = involvedPerson.id;
    payment.validFrom = involvedPerson.startOfInvolvement;
    this.select(payment);
  }

  select(payment: UtilityCostPayment): void {
    this._selectedPayment.set({...payment});
  }

  deselect(): void {
    this._selectedPayment.set(null);
  }

  create(payment: UtilityCostPayment): void {
    const selectedPerson = this.involvedPersonStore.selectedPerson();
    if (!selectedPerson) {
      return;
    }

    this.service.save(payment).subscribe({
      next: () => {
        this.loadHistory(selectedPerson);
        this.deselect();
      },
      error: () => this._error.set('Failed to create payment.')
    });
  }

  update(payment: UtilityCostPayment): void {
    const selectedPerson = this.involvedPersonStore.selectedPerson();
    if (!selectedPerson) {
      return;
    }

    this.service.update(payment).subscribe({
      next: () => {
        this.loadHistory(selectedPerson);
        this.deselect();
      },
      error: () => this._error.set('Failed to update payment.')
    });
  }

  delete(payment: UtilityCostPayment): void {
    const selectedPerson = this.involvedPersonStore.selectedPerson();
    if (!selectedPerson) {
      return;
    }

    this.service.delete(payment).subscribe({
      next: () => {
        this.loadHistory(selectedPerson);
        this.deselect();
      },
      error: () => this._error.set('Failed to delete payment.')
    });
  }
}
