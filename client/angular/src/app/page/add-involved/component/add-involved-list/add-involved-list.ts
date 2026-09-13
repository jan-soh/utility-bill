import {Component, computed, inject} from '@angular/core';
import {InvolvedPersonSubject} from '../../../../service/InvolvedPersonSubject';
import {InvolvedPerson} from '../../../../model/InvolvedPerson';
import {UtilityCostPaymentsPerMonth} from '../../../../model/UtilityCostPaymentsPerMonth';
import {DatePipe, NgIf} from '@angular/common';

@Component({
  selector: 'add-involved-list',
  templateUrl: './add-involved-list.html',
  styleUrl: './add-involved-list.css',
  imports: [NgIf],
})
export class AddInvolvedList {

  private involvedSubject = inject(InvolvedPersonSubject);
  public involvedList = this.involvedSubject.involvedPersons;
  public error = this.involvedSubject.error;

  public getCurrentUtilityCostPaymentsPerMonth(involvedPerson: InvolvedPerson): UtilityCostPaymentsPerMonth {

    let lastDate = new Date();
    let currentUtilityCostPaymentsPerMonth: UtilityCostPaymentsPerMonth = new UtilityCostPaymentsPerMonth();

    lastDate.setFullYear(0);
    involvedPerson.utilityCostPaymentsPerMonthHistory.forEach(payments => {
      const validFrom = new Date(payments.validFrom);
      if (validFrom > lastDate) {
        lastDate = validFrom;
        currentUtilityCostPaymentsPerMonth = payments;
      }
    });
    return currentUtilityCostPaymentsPerMonth;
  }
}
