import {Component, computed, inject, input, signal} from '@angular/core';
import {InvolvedPersonSubject} from '../../../../service/InvolvedPersonSubject';
import {InvolvedPerson} from '../../../../model/InvolvedPerson';
import {UtilityCostPaymentsPerMonth} from '../../../../model/UtilityCostPaymentsPerMonth';
import {NgIf} from '@angular/common';

@Component({
  selector: 'utility-cost-payments-list',
  styleUrls: ['./utility-cost-payments-list.css'],
  templateUrl: './utility-cost-payments-list.html',
  imports: [NgIf],
})
export class UtilityCostPaymentsList {

  public involvedPerson = input.required<InvolvedPerson>();
  public paymentHistory = computed(() => this.involvedPerson().utilityCostPaymentsPerMonthHistory);

  public add(): void {
  }

  public delete(payment: UtilityCostPaymentsPerMonth): void {

  }

  public edit(payment: UtilityCostPaymentsPerMonth): void {

  }
}
