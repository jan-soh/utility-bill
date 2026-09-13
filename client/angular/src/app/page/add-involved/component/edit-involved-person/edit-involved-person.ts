import {Component, computed, inject, input} from '@angular/core';
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

  private involvedSubject: InvolvedPersonSubject = inject(InvolvedPersonSubject);
  public error = this.involvedSubject.error;
  public involvedPerson = input.required<InvolvedPerson>();
  public paymentHistory = computed(() => this.involvedPerson().utilityCostPaymentsPerMonthHistory);

  constructor() {
  }

  public delete(payment: UtilityCostPaymentsPerMonth): void {

  }

  public create(): void {

  }
}
