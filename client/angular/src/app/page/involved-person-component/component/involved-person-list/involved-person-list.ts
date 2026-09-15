import {Component, inject, output} from '@angular/core';
import {InvolvedPersonSubject} from '../../../../observers/involved-person/InvolvedPersonSubject';
import {InvolvedPerson} from '../../../../model/InvolvedPerson';
import {UtilityCostPayment} from '../../../../model/UtilityCostPayment';

@Component({
  selector: 'involved-person-list',
  templateUrl: './involved-person-list.html',
  styleUrl: './involved-person-list.css',
})
export class InvolvedPersonList {

  private involvedSubject: InvolvedPersonSubject = inject(InvolvedPersonSubject);
  public involvedList = this.involvedSubject.involvedPersons;
  public involvedPersonSelected = output<InvolvedPerson>();

  public getCurrentUtilityCostPayment(involvedPerson: InvolvedPerson): UtilityCostPayment {

    let lastDate = new Date();
    let currentUtilityCostPayment: UtilityCostPayment = new UtilityCostPayment();

    lastDate.setFullYear(0);
    involvedPerson.utilityCostPaymentHistory.forEach(payments => {
      const validFrom = new Date(payments.validFrom);
      if (validFrom > lastDate) {
        lastDate = validFrom;
        currentUtilityCostPayment = payments;
      }
    });
    return currentUtilityCostPayment;
  }

  public edit(involvedPerson: InvolvedPerson) {
    this.involvedPersonSelected.emit(involvedPerson);
  }
}
