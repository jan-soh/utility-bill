import {Component, inject, signal} from '@angular/core';
import {InvolvedPerson} from '../../../../model/InvolvedPerson';
import {UtilityCostPaymentsPerMonth} from '../../../../model/UtilityCostPaymentsPerMonth';
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
  utilityCostPaymentsPerMonth = signal<UtilityCostPaymentsPerMonth>(new UtilityCostPaymentsPerMonth());

  error = this.involvedPersonSubject.error;
  actionMessage = signal<string | null>(null);
  isSaving: boolean = false;


  public save(): void {

    if (this.isValidForSave()) {
      this.isSaving = true;
      this.involvedPerson().utilityCostPaymentsPerMonthHistory.push(this.utilityCostPaymentsPerMonth());

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

  private isValidForSave(): boolean {
    if (!this.involvedPerson().name) {
      this.actionMessage.set('Name is required');
      return false;
    }
    if (!this.involvedPerson().startOfInvolvement) {
      this.actionMessage.set('Start of involvement is required');
      return false;
    }
    if (!this.utilityCostPaymentsPerMonth().amount) {
      this.actionMessage.set('Shared amount of utility  payments is required');
      return false;
    }
    if (!this.utilityCostPaymentsPerMonth().validFrom) {
      this.actionMessage.set('Start of utility cost payments is required');
      return false;
    }

    return true;
  }

  public reset(): void {
    this.actionMessage.set(null);
    this.involvedPersonSubject.clearError();
  }
}
