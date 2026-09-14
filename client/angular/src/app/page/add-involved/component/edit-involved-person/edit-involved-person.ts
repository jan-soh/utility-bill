import {Component, computed, inject, input, signal} from '@angular/core';
import {InvolvedPersonSubject} from '../../../../service/InvolvedPersonSubject';
import {InvolvedPerson} from '../../../../model/InvolvedPerson';
import {UtilityCostPaymentsPerMonth} from '../../../../model/UtilityCostPaymentsPerMonth';
import {NgIf} from '@angular/common';

@Component({
  selector: 'edit-involved-person',
  styleUrls: ['./edit-involved-person.css'],
  templateUrl: './edit-involved-person.html',
  imports: [NgIf],
})
export class EditInvolvedPerson {

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
