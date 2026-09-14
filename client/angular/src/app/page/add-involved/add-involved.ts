import {Component, signal} from '@angular/core';
import {AddInvolvedForm} from './component/add-involved-form/add-involved-form';
import {AddInvolvedList} from './component/add-involved-list/add-involved-list';
import {InvolvedPerson} from '../../model/InvolvedPerson';
import {EditInvolvedPerson} from './component/edit-involved-person/edit-involved-person';
import {UtilityCostPaymentsPerMonth} from '../../model/UtilityCostPaymentsPerMonth';

@Component({
  selector: 'add-involved',
  templateUrl: './add-involved.html',
  styleUrl: './add-involved.css',
  imports: [AddInvolvedForm, AddInvolvedList, EditInvolvedPerson],
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
