import {inject, Injectable, signal} from '@angular/core';
import {InvolvedPerson} from '../../model/InvolvedPerson';
import {InvolvedPersonService} from '../../service/InvolvedPersonService';
import {catchError, of, tap} from 'rxjs';
import {InvolvedPersonAddedObserver} from './InvolvedPersonAddedObserver';
import {InvolvedPersonCreatedObserver} from './InvolvedPersonCreatedObserver';

@Injectable({
  providedIn: 'root'
})
export class InvolvedPersonSubject {

  private readonly involvedService = inject(InvolvedPersonService);

  private readonly involvedPersonAddedObservers: InvolvedPersonAddedObserver[] = [];
  private readonly involvedPersonCreatedObservers: InvolvedPersonCreatedObserver[] = [];

  private involvedPersonsSignal = signal<InvolvedPerson[]>([]);

  private selectedInvolvedPersonSignal = signal<InvolvedPerson | null>(null);
  private involvedPersonAdded: InvolvedPerson | null = null;

  public readonly involvedPersons = this.involvedPersonsSignal.asReadonly();

  constructor() {
    this.involvedService.findAll().pipe(
      catchError(err => {
        return of([]);
      })
    ).subscribe(persons => {
      this.involvedPersonsSignal.set(persons);
    });
  }

  public registerInvolvedPersonAddedObserver(observer: InvolvedPersonAddedObserver): void {
    this.involvedPersonAddedObservers.push(observer);
  }

  public notifyInvolvedPersonAdded(involvedPerson: InvolvedPerson): void {
    this.involvedPersonAddedObservers.forEach(observer => observer.involvedPersonAdded(involvedPerson));
  }

  public registerInvolvedPersonCreatedObserver(observer: InvolvedPersonCreatedObserver): void {
    this.involvedPersonCreatedObservers.push(observer);
  }

  public notifyInvolvedPersonCreated(involvedPerson: InvolvedPerson): void {
    this.involvedPersonCreatedObservers.forEach(observer => observer.involvedPersonCreated(involvedPerson));
  }

  public notifyInvolvedPersonCreatedError(errorMessage: string): void {
    this.involvedPersonCreatedObservers.forEach(observer => observer.involvedPersonCreatedError(errorMessage));
  }

  public addInvolvedPerson(): void {
    this.involvedPersonAdded = new InvolvedPerson();
    this.notifyInvolvedPersonAdded(this.involvedPersonAdded);
  }

  public createInvolvedPerson(): void {
    if (!this.involvedPersonAdded) {
      return;
    }

    this.involvedService.save(this.involvedPersonAdded).pipe(
      tap(savedInvolvedPerson => {
        this.involvedPersonsSignal.update(current => {
          const index = current.findIndex(p => p.id === savedInvolvedPerson.id);
          if (index > -1) {
            return current.map((p, i) => i === index ? savedInvolvedPerson : p);
          } else {
            return [...current, savedInvolvedPerson];
          }
        });
        this.notifyInvolvedPersonCreated(savedInvolvedPerson);
      }),
      catchError((err) => {
        this.notifyInvolvedPersonCreatedError("Failed to create involved person.");
        return of(null);
      })
    ).subscribe();
  }
}
