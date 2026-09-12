import {Component} from '@angular/core';
import {AddInvolvedForm} from './component/add-involved-form/add-involved-form';
import {AddInvolvedList} from './component/add-involved-list/add-involved-list';

@Component({
  selector: 'add-involved',
  templateUrl: './add-involved.html',
  imports: [AddInvolvedForm, AddInvolvedList],
})
export class AddInvolved {

}
