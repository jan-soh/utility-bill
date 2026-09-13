import {Component, signal} from '@angular/core';
import {AddInvolvedForm} from './component/add-involved-form/add-involved-form';
import {AddInvolvedList} from './component/add-involved-list/add-involved-list';
import {InvolvedPerson} from '../../model/InvolvedPerson';
import {EditInvolvedPerson} from './component/edit-involved-person/edit-involved-person';

@Component({
  selector: 'add-involved',
  templateUrl: './add-involved.html',
  imports: [AddInvolvedForm, AddInvolvedList, EditInvolvedPerson],
})
export class AddInvolved {

  involvedPersonSelected = signal<InvolvedPerson | null>(null);

  public setInvolvedPersonSelected(involvedPerson: InvolvedPerson) {
    this.involvedPersonSelected.update(p => p = involvedPerson);
  }
}
