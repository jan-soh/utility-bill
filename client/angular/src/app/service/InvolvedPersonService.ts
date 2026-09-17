import {inject, Injectable} from '@angular/core';
import {InvolvedPerson} from '../model/InvolvedPerson';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvolvedPersonService {

  static readonly API_URL = 'http://localhost:8080/api/v1/involved-person';

  private http: HttpClient = inject(HttpClient);

  public findAll(): Observable<InvolvedPerson[]> {
    return this.http.get<InvolvedPerson[]>(InvolvedPersonService.API_URL).pipe(
      catchError(err => {
        console.error("Failed to load all involved persons.", err);
        return throwError(() => err.error);
      })
    );
  }

  public save(involvedPerson: InvolvedPerson): Observable<InvolvedPerson> {
    return this.http.post<InvolvedPerson>(InvolvedPersonService.API_URL, involvedPerson).pipe(
      catchError(err => {
        console.error("Failed to save involved person.", err);
        return throwError(() => err.error);
      })
    );
  }

  public update(involvedPerson: InvolvedPerson): Observable<InvolvedPerson> {
    return this.http.put<InvolvedPerson>(`${InvolvedPersonService.API_URL}/${involvedPerson.id}`, involvedPerson).pipe(
      catchError(err => {
        console.error("Failed to update involved person.", err);
        return throwError(() => err.error);
      })
    );
  }

  public delete(involvedPerson: InvolvedPerson): Observable<void> {
    return this.http.delete<void>(`${InvolvedPersonService.API_URL}/${involvedPerson.id}`).pipe(
      catchError(err => {
        console.error("Failed to delete involved person.", err);
        return throwError(() => err.error);
      })
    );
  }
}
