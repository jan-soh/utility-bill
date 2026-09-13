import {Component, inject, signal} from '@angular/core';
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

  private readonly involvedPersonSubject: InvolvedPersonSubject = inject(InvolvedPersonSubject);

  involvedPerson = signal<InvolvedPerson>(new InvolvedPerson());
  error = this.involvedPersonSubject.error;
  actionMessage = signal<string | null>(null);
  isSaving: boolean = false;


  public save(): void {

    if (this.involvedPerson().name && this.involvedPerson().startOfInvolvement) {
      this.isSaving = true;
      this.involvedPersonSubject.apply(this.involvedPerson()).subscribe(
        success => {
          if (success) {
            this.involvedPerson.set(new InvolvedPerson());
            this.actionMessage.set('Involved person added successfully');
          }
          this.isSaving = false;
        }
      )
    }
  }

  public reset(): void {
    this.actionMessage.set(null);
    this.involvedPersonSubject.clearError();
  }
}
