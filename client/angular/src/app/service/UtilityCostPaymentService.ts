import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UtilityCostPayment} from '../model/UtilityCostPayment';

@Injectable({
  providedIn: 'root'
})
export class UtilityCostPaymentService {

  static readonly API_URL = 'http://localhost:8080/api/v1/utility-cost-payment';

  private http: HttpClient = inject(HttpClient);

  public findAll(involvedPersonId: string): Observable<UtilityCostPayment[]> {
    return this.http.get<UtilityCostPayment[]>(UtilityCostPaymentService.API_URL);
  }

  public save(payment: UtilityCostPayment): Observable<UtilityCostPayment> {
    return this.http.post<UtilityCostPayment>(UtilityCostPaymentService.API_URL, payment);
  }
}
