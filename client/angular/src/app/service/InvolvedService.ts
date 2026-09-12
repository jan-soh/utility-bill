import {Injectable} from '@angular/core';
import {Involved} from '../model/Involved';

@Injectable({
  providedIn: 'root'
})
export class InvolvedService {

  public findAll(): Involved[] {
    const involved1 = new Involved();
    involved1.name = 'John Doe';
    involved1.startOfInvolvement = new Date();
    involved1.startOfInvolvement.setFullYear(2022);
    involved1.startOfInvolvement.setMonth(0);
    involved1.startOfInvolvement.setDate(1);
    involved1.endOfInvolvement = new Date();
    involved1.endOfInvolvement.setFullYear(2024);
    involved1.endOfInvolvement.setMonth(10);
    involved1.endOfInvolvement.setDate(30);
    const involved2 = new Involved();
    involved2.startOfInvolvement = new Date();
    involved2.startOfInvolvement.setFullYear(2024);
    involved2.startOfInvolvement.setMonth(11);
    involved2.startOfInvolvement.setDate(31);
    involved2.name = 'Jane Doe';
      return [involved1, involved2];
   }
}
