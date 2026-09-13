import {Component, inject, output} from '@angular/core';
import {InvolvedPersonSubject} from '../../../../service/InvolvedPersonSubject';
import {InvolvedPerson} from '../../../../model/InvolvedPerson';
import {UtilityCostPaymentsPerMonth} from '../../../../model/UtilityCostPaymentsPerMonth';
import {NgIf} from '@angular/common';

@Component({
  selector: 'add-involved-list',
  templateUrl: './add-involved-list.html',
  styleUrl: './add-involved-list.css',
  imports: [NgIf],
})
export class AddInvolvedList {

  private involvedSubject: InvolvedPersonSubject = inject(InvolvedPersonSubject);
  public involvedList = this.involvedSubject.involvedPersons;
  public error = this.involvedSubject.error;
  public involvedPersonSelected = output<InvolvedPerson>();

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

  public edit(involvedPerson: InvolvedPerson) {
    this.involvedPersonSelected.emit(involvedPerson);
  }
}
