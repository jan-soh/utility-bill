import {Component, inject, signal} from '@angular/core';
import {InvolvedPerson} from '../../model/InvolvedPerson';
import {InvolvedPersonForm} from './component/involved-person-form/involved-person-form';
import {UtilityCostPayment} from '../../model/UtilityCostPayment';
import {UtilityCostPaymentsForm} from './component/utility-cost-payments-form/utility-cost-payments-form';
import {InvolvedPersonList} from './component/involved-person-list/involved-person-list';
import {InvolvedPersonSubject} from '../../observers/involved-person/InvolvedPersonSubject';
import {UtilityCostPaymentsList} from './component/utility-cost-payments-list/utility-cost-payments-list';

@Component({
  selector: 'involved-person-component',
  templateUrl: './involved-person-component.html',
  styleUrl: './involved-person-component.css',
  imports: [InvolvedPersonForm, InvolvedPersonList, UtilityCostPaymentsForm, UtilityCostPaymentsList],
})
export class InvolvedPersonComponent {

  involvedPersonSelected = signal<InvolvedPerson | null>(null);
  utilityCostPaymentsSelected = signal<UtilityCostPayment | null>(null);
  involvedPersonSubject = inject(InvolvedPersonSubject);

  public setInvolvedPersonSelected(involvedPerson: InvolvedPerson) {
    this.involvedPersonSelected.set(involvedPerson);
  }

  public add(): void {
    this.involvedPersonSubject.requestAddInvolvedPerson();
  }
}
