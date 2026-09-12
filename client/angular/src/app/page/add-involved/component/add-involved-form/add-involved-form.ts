import {Component, inject} from '@angular/core';
import {InvolvedPerson} from '../../../../model/InvolvedPerson';
import {InvolvedPersonSubject} from '../../../../service/InvolvedPersonSubject';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'add-involved-form',
  templateUrl: './add-involved-form.html',
  styleUrl: './add-involved-form.css',
  imports: [FormsModule, CommonModule],
})
export class AddInvolvedForm {
  involvedPerson: InvolvedPerson = new InvolvedPerson();
  isSaving: boolean = false;
  private readonly involvedPersonSubject: InvolvedPersonSubject = inject(InvolvedPersonSubject);

  public save(): void {

    if (this.involvedPerson.name && this.involvedPerson.startOfInvolvement) {
      this.isSaving = true;
      this.involvedPersonSubject.apply(this.involvedPerson);
      this.involvedPerson = new InvolvedPerson();
      this.isSaving = false;
    }
  }
}
