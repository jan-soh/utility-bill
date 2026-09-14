import {Component, computed, inject, input, signal} from '@angular/core';
import {InvolvedPersonSubject} from '../../../../service/InvolvedPersonSubject';
import {InvolvedPerson} from '../../../../model/InvolvedPerson';
import {UtilityCostPaymentsPerMonth} from '../../../../model/UtilityCostPaymentsPerMonth';
import {NgIf} from '@angular/common';

@Component({
  selector: 'utility-cost-payments-form',
  styleUrl: './utility-cost-payments-form.css',
  templateUrl: './utility-cost-payments-form.html',
  imports: [NgIf],
})
export class UtilityCostPaymentsForm {

  private readonly involvedPersonSubject: InvolvedPersonSubject = inject(InvolvedPersonSubject);
  public error = this.involvedPersonSubject.error;
  public involvedPerson = input.required<InvolvedPerson>();
  public utilityCostPayments = input.required<UtilityCostPaymentsPerMonth>();
  actionMessage = signal<string | null>(null);


  public save() {

  }

  public reset(): void {
    this.actionMessage.set(null);
    this.involvedPersonSubject.clearError();
  }
}
