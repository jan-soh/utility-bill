import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {UtilityCostPayment} from '../model/UtilityCostPayment';

@Injectable({
  providedIn: 'root'
})
export class UtilityCostPaymentService {

  static readonly API_URL = 'http://localhost:8080/api/v1/utility-cost-payment';
  static readonly API_URL_HISTORY = `${UtilityCostPaymentService.API_URL}/history`;

  private http: HttpClient = inject(HttpClient);

  public getHistoryByInvolvedPerson(involvedPersonId: string): Observable<UtilityCostPayment[]> {
    return this.http.get<UtilityCostPayment[]>(`${UtilityCostPaymentService.API_URL_HISTORY}/${involvedPersonId}`);
  }

  public save(payment: UtilityCostPayment): Observable<UtilityCostPayment> {
    return this.http.post<UtilityCostPayment>(UtilityCostPaymentService.API_URL, payment);
  }

  public update(payment: UtilityCostPayment): Observable<UtilityCostPayment> {
    return this.http.put<UtilityCostPayment>(`${UtilityCostPaymentService.API_URL}/${payment.id}`, payment).pipe(
      catchError(err => {
        console.error("Failed to update utility cost payment.", err);
        return throwError(() => err.error);
      })
    );
  }

  public delete(payment: UtilityCostPayment): Observable<void> {
    return this.http.delete<void>(`${UtilityCostPaymentService.API_URL}/${payment.id}`).pipe(
      catchError(err => {
        console.error("Failed to delete utility cost payment.", err);
        return throwError(() => err.error);
      })
    );
  }
}
