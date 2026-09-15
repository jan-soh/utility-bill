import {inject, Injectable} from '@angular/core';
import {InvolvedPerson} from '../model/InvolvedPerson';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvolvedPersonService {

  static readonly API_URL = 'http://localhost:8080/api/v1/involved-person';

  private http: HttpClient = inject(HttpClient);

  public findAll(): Observable<InvolvedPerson[]> {
    return this.http.get<InvolvedPerson[]>(InvolvedPersonService.API_URL);
  }

  public save(involvedPerson: InvolvedPerson): Observable<InvolvedPerson> {
    return this.http.post<InvolvedPerson>(InvolvedPersonService.API_URL, involvedPerson);
  }

  public delete(involvedPerson: InvolvedPerson): Observable<void> {
    return this.http.delete<void>(`${InvolvedPersonService.API_URL}/${involvedPerson.id}`);
  }
}
