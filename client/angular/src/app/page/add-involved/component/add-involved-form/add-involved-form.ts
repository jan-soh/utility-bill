import {Component} from '@angular/core';
import {Involved} from '../../../../model/Involved';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'add-involved-form',
  templateUrl: './add-involved-form.html',
  styleUrl: './add-involved-form.css',
  imports: [FormsModule],
})
export class AddInvolvedForm {
  involved: Involved = new Involved();

  public save(): void {
    console.log(this.involved);
  }
}
