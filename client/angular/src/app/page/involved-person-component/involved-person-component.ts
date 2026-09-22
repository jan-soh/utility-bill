import {Component, inject} from '@angular/core';
import {InvolvedPersonForm} from './component/involved-person-form/involved-person-form';
import {UtilityCostPaymentsForm} from './component/utility-cost-payments-form/utility-cost-payments-form';
import {InvolvedPersonList} from './component/involved-person-list/involved-person-list';
import {UtilityCostPaymentsList} from './component/utility-cost-payments-list/utility-cost-payments-list';
import {InvolvedPersonStore} from '../../store/InvolvedPersonStore';

@Component({
  selector: 'involved-person-component',
  templateUrl: './involved-person-component.html',
  styleUrl: './involved-person-component.css',
  imports: [InvolvedPersonForm, InvolvedPersonList, UtilityCostPaymentsForm, UtilityCostPaymentsList],
})
export class InvolvedPersonComponent {

  readonly store = inject(InvolvedPersonStore);

  public add(): void {
    this.store.add();
  }
}
