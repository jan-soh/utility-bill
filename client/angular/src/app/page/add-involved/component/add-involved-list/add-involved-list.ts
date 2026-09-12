import {Component, inject} from '@angular/core';
import {InvolvedPersonSubject} from '../../../../service/InvolvedPersonSubject';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'add-involved-list',
  templateUrl: './add-involved-list.html',
  styleUrl: './add-involved-list.css',
  imports: [DatePipe],
})
export class AddInvolvedList {

  private involvedSubject = inject(InvolvedPersonSubject);
  public involvedList = this.involvedSubject.involvedPersons;
}
