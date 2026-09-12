import {inject, Injectable} from '@angular/core';
import {InvolvedPerson} from '../model/InvolvedPerson';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvolvedPersonService {
  private http: HttpClient = inject(HttpClient);

  public findAll(): Observable<InvolvedPerson[]> {
    const involved1 = new InvolvedPerson();
    involved1.id = '1234567890'
    involved1.name = 'John Doe';
    involved1.startOfInvolvement = new Date();
    involved1.startOfInvolvement.setFullYear(2022);
    involved1.startOfInvolvement.setMonth(0);
    involved1.startOfInvolvement.setDate(1);
    involved1.endOfInvolvement = new Date();
    involved1.endOfInvolvement.setFullYear(2024);
    involved1.endOfInvolvement.setMonth(10);
    involved1.endOfInvolvement.setDate(30);
    const involved2 = new InvolvedPerson();
    involved2.id = '098765443421'
    involved2.name = 'Jane Doe';
    involved2.startOfInvolvement = new Date();
    involved2.startOfInvolvement.setFullYear(2024);
    involved2.startOfInvolvement.setMonth(11);
    involved2.startOfInvolvement.setDate(31);

    return new Observable<InvolvedPerson[]>(observer => {
      observer.next([involved1, involved2]);
    })

    //return this.http.get<InvolvedPerson[]>('http://localhost:8084/involved-person');
  }

  public save(involvedPerson: InvolvedPerson): Observable<InvolvedPerson> {
    involvedPerson.id = '12345678' + Math.floor(Math.random() * 1000000000);
    return new Observable<InvolvedPerson>(observer => {
      observer.next(involvedPerson);
    })
    //return this.http.post<InvolvedPerson>('http://localhost:8084/involved-person', involved);
  }
}
