import {Component, inject} from '@angular/core';
import {Involved} from '../../../../model/Involved';
import {InvolvedService} from '../../../../service/InvolvedService';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'add-involved-list',
  templateUrl: './add-involved-list.html',
  styleUrl: './add-involved-list.css',
  imports: [DatePipe],
})
export class AddInvolvedList{
  private involvedService = inject(InvolvedService);
  public involvedList: Array<Involved> = this.involvedService.findAll();
}
