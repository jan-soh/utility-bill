import {Component, signal} from '@angular/core';
import {AddInvolvedList} from './component/add-involved-list/add-involved-list';
import {InvolvedPerson} from '../../model/InvolvedPerson';
import {InvolvedPersonForm} from './component/involved-person-form/involved-person-form';
import {UtilityCostPaymentsPerMonth} from '../../model/UtilityCostPaymentsPerMonth';
import {UtilityCostPaymentsForm} from './component/utility-cost-payments-form/utility-cost-payments-form';

@Component({
  selector: 'add-involved',
  templateUrl: './add-involved.html',
  styleUrl: './add-involved.css',
  imports: [InvolvedPersonForm, AddInvolvedList, UtilityCostPaymentsForm],
})
export class AddInvolved {

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
