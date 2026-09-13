import {Component, computed, inject} from '@angular/core';
import {InvolvedPersonSubject} from '../../../../service/InvolvedPersonSubject';
import {DatePipe, NgIf} from '@angular/common';

@Component({
  selector: 'add-involved-list',
  templateUrl: './add-involved-list.html',
  styleUrl: './add-involved-list.css',
  imports: [DatePipe, NgIf],
})
export class AddInvolvedList {

  private involvedSubject = inject(InvolvedPersonSubject);
  public involvedList = this.involvedSubject.involvedPersons;
  public error = this.involvedSubject.error;
}
