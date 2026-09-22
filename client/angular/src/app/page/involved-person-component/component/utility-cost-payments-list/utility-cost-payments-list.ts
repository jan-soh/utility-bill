import {Component, computed, inject} from '@angular/core';
import {UtilityCostPayment} from '../../../../model/UtilityCostPayment';
import {InvolvedPersonStore} from '../../../../store/InvolvedPersonStore';
import {UtilityCostPaymentStore} from '../../../../store/UtilityCostPaymentStore';

@Component({
  selector: 'utility-cost-payments-list',
  styleUrls: ['./utility-cost-payments-list.css'],
  templateUrl: './utility-cost-payments-list.html',
})
export class UtilityCostPaymentsList {


  readonly involvedPersonStore = inject(InvolvedPersonStore);
  readonly utilityCostPaymentStore = inject(UtilityCostPaymentStore);

  readonly visible = computed(() => this.involvedPersonStore.hasSelectedPerson() && this.utilityCostPaymentStore.hasPaymentHistory());

  public add(): void {

    const involvedPerson = this.involvedPersonStore.selectedPerson();

    if (involvedPerson) {
      this.utilityCostPaymentStore.add(involvedPerson);
    }
  }

  public delete(payment: UtilityCostPayment): void {
    this.utilityCostPaymentStore.delete(payment);
  }

  public edit(payment: UtilityCostPayment): void {
    this.utilityCostPaymentStore.select(payment);
  }
}
