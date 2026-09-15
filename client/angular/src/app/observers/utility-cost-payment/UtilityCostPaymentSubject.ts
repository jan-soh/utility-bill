import {inject, Injectable} from '@angular/core';
import {UtilityCostPayment} from '../../model/UtilityCostPayment';
import {UtilityCostPaymentService} from '../../service/UtilityCostPaymentService';
import {catchError, of, tap} from 'rxjs';
import {UtilityCostPaymentCreatedObserver} from './UtilityCostPaymentCreatedObserver';
import {InvolvedPersonSubject} from '../involved-person/InvolvedPersonSubject';
import {InvolvedPerson} from '../../model/InvolvedPerson';
import {InvolvedPersonCreatedObserver} from '../involved-person/InvolvedPersonCreatedObserver';
import {UtilityCostPaymentAddedObserver} from './UtilityCostPaymentAddedObserver';
import {UtilityCostPaymentHistoryChangedObserver} from './UtilityCostPaymentHistoryChangedObserver';

@Injectable({
  providedIn: 'root'
})
export class UtilityCostPaymentSubject implements InvolvedPersonCreatedObserver {

  private readonly involvedPersonSubject = inject(InvolvedPersonSubject);
  private readonly utilityCostPaymentService = inject(UtilityCostPaymentService);

  private utilityCostPaymentAdded: UtilityCostPayment | null = null;
  private utilityCostPaymentHistory: UtilityCostPayment[] = [];

  private readonly utilityCostPaymentAddedObservers: UtilityCostPaymentAddedObserver[] = [];
  private readonly utilityCostPaymentCreatedObservers: UtilityCostPaymentCreatedObserver[] = [];
  private readonly utilityCostPaymentHistoryChangedObservers: UtilityCostPaymentHistoryChangedObserver[] = [];

  constructor() {
    this.involvedPersonSubject.registerInvolvedPersonCreatedObserver(this);
  }

  public registerUtilityCostPaymentAddedObserver(observer: UtilityCostPaymentAddedObserver): void {
    this.utilityCostPaymentAddedObservers.push(observer);
  }

  public notifyUtilityCostPaymentAdded(utilityCostPayment: UtilityCostPayment): void {
    this.utilityCostPaymentAddedObservers.forEach(observer => observer.utilityCostPaymentAdded(utilityCostPayment));
  }

  public registerUtilityCostPaymentCreatedObserver(observer: UtilityCostPaymentCreatedObserver): void {
    this.utilityCostPaymentCreatedObservers.push(observer);
  }

  public registerUtilityCostPaymentHistoryChangedObserver(observer: UtilityCostPaymentHistoryChangedObserver): void {
    this.utilityCostPaymentHistoryChangedObservers.push(observer);
  }

  public notifyUtilityCostPaymentCreated(utilityCostPayment: UtilityCostPayment): void {
    this.utilityCostPaymentCreatedObservers.forEach(observer => observer.utilityCostPaymentCreated(utilityCostPayment));
  }

  public notifyUtilityCostPaymentCreatedError(errorMessage: string): void {
    this.utilityCostPaymentCreatedObservers.forEach(observer => observer.utilityCostPaymentCreatedError(errorMessage));
  }

  public notifyUtilityCostPaymentHistoryChanged(utilityCostPaymentHistory: UtilityCostPayment[]): void {
    this.utilityCostPaymentHistoryChangedObservers.forEach(observer => observer.utilityCostPaymentHistoryChanged(utilityCostPaymentHistory));
  }

  public addUtilityCostPayment(involvedPerson: InvolvedPerson): void {

    this.utilityCostPaymentAdded = new UtilityCostPayment();
    this.utilityCostPaymentAdded.involvedPersonId = involvedPerson.id;
    this.utilityCostPaymentAdded.validFrom = involvedPerson.startOfInvolvement;

    this.utilityCostPaymentService.findAll(involvedPerson.id).subscribe(
      utilityCostPayments => {
        this.utilityCostPaymentHistory = utilityCostPayments;
        this.notifyUtilityCostPaymentHistoryChanged(utilityCostPayments);
      }
    )

    this.notifyUtilityCostPaymentAdded(this.utilityCostPaymentAdded);
  }

  public createUtilityCostPayment(): void {

    if (!this.utilityCostPaymentAdded) {
      return;
    }

    this.utilityCostPaymentService.save(this.utilityCostPaymentAdded).pipe(
      tap(savedUtilityCostPayment => {
        this.utilityCostPaymentHistory.push(savedUtilityCostPayment);
        this.notifyUtilityCostPaymentCreated(savedUtilityCostPayment);
        this.notifyUtilityCostPaymentHistoryChanged(this.utilityCostPaymentHistory);
        this.utilityCostPaymentAdded = savedUtilityCostPayment;
      }),
      catchError((err) => {
        this.notifyUtilityCostPaymentCreatedError("Failed to create utility cost payment.");
        return of(null);
      })
    ).subscribe();
  }

  public involvedPersonCreated(involvedPerson: InvolvedPerson): void {

    this.utilityCostPaymentAdded = new UtilityCostPayment();
    this.utilityCostPaymentAdded.involvedPersonId = involvedPerson.id;
    this.utilityCostPaymentAdded.validFrom = involvedPerson.startOfInvolvement;

    this.notifyUtilityCostPaymentAdded(this.utilityCostPaymentAdded);
  }

  public involvedPersonCreatedError(error: string): void {
    // nothing to here
  }
}
