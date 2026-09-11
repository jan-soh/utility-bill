import {Component} from '@angular/core';
import {Involved} from './model/Involved';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'add-involved',
  templateUrl: './add-involved.html',
  imports: [FormsModule],
})
export class AddInvolved {
  involved: Involved = new Involved();

  public save(): void {
    console.log(this.involved);
  }
}
