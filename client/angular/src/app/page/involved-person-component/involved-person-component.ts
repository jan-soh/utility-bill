import {Component, signal} from '@angular/core';
import {InvolvedPerson} from '../../model/InvolvedPerson';
import {InvolvedPersonForm} from './component/involved-person-form/involved-person-form';
import {UtilityCostPaymentsPerMonth} from '../../model/UtilityCostPaymentsPerMonth';
import {UtilityCostPaymentsForm} from './component/utility-cost-payments-form/utility-cost-payments-form';
import {InvolvedPersonList} from './component/involved-person-list/involved-person-list';

@Component({
  selector: 'involved-person-component',
  templateUrl: './involved-person-component.html',
  styleUrl: './involved-person-component.css',
  imports: [InvolvedPersonForm, InvolvedPersonList, UtilityCostPaymentsForm],
})
export class InvolvedPersonComponent {

  involvedPersonSelected = signal<InvolvedPerson | null>(null);
  utilityCostPaymentsSelected = signal<UtilityCostPaymentsPerMonth | null>(null);

  public setInvolvedPersonSelected(involvedPerson: InvolvedPerson) {
    this.involvedPersonSelected.set(involvedPerson);
  }

  public add(): void {
    this.involvedPersonSelected.set(new InvolvedPerson());
  }

  public clearSelection(): void {
    this.involvedPersonSelected.set(null);
  }
}
