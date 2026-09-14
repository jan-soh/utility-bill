import {Component, computed, input} from '@angular/core';
import {InvolvedPerson} from '../../../../model/InvolvedPerson';
import {UtilityCostPayment} from '../../../../model/UtilityCostPayment';
import {NgIf} from '@angular/common';

@Component({
  selector: 'utility-cost-payments-list',
  styleUrls: ['./utility-cost-payments-list.css'],
  templateUrl: './utility-cost-payments-list.html',
  imports: [NgIf],
})
export class UtilityCostPaymentsList {


  public involvedPerson = input.required<InvolvedPerson>();
  public paymentHistory = computed(() => this.involvedPerson().utilityCostPaymentHistory);

  public add(): void {
  }

  public delete(payment: UtilityCostPayment): void {

  }

  public edit(payment: UtilityCostPayment): void {

  }
}
