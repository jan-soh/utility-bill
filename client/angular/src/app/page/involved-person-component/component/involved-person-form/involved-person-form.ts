import {Component, inject, input, output, signal} from '@angular/core';
import {InvolvedPerson} from '../../../../model/InvolvedPerson';
import {UtilityCostPayment} from '../../../../model/UtilityCostPayment';
import {InvolvedPersonSubject} from '../../../../service/InvolvedPersonSubject';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'involved-person-form',
  templateUrl: './involved-person-form.html',
  styleUrl: './involved-person-form.css',
  imports: [FormsModule, CommonModule],
})
export class InvolvedPersonForm {

  private readonly involvedPersonSubject: InvolvedPersonSubject = inject(InvolvedPersonSubject);

  public involvedPerson = input.required<InvolvedPerson>();
  public saved = output<void>();
  utilityCostPayment = signal<UtilityCostPayment>(new UtilityCostPayment());

  error = this.involvedPersonSubject.error;
  actionMessage = signal<string | null>(null);
  isSaving: boolean = false;


  public save(): void {

    if (this.isValidForSave()) {
      this.isSaving = true;

      this.utilityCostPayment.update(payments => {
        payments.validFrom = new Date(this.involvedPerson().startOfInvolvement);
        return payments;
      });

      this.involvedPerson().utilityCostPaymentHistory.push(this.utilityCostPayment());

      this.involvedPersonSubject.apply(this.involvedPerson()).subscribe(
        success => {
          if (success) {
            this.utilityCostPayment.set(new UtilityCostPayment());
            this.actionMessage.set('Involved person added successfully');
            this.saved.emit();
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

    return true;
  }

  public reset(): void {
    this.actionMessage.set(null);
    this.involvedPersonSubject.clearError();
  }
}
