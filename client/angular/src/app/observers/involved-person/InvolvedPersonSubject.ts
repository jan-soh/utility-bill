import {inject, Injectable, signal} from '@angular/core';
import {InvolvedPerson} from '../../model/InvolvedPerson';
import {InvolvedPersonService} from '../../service/InvolvedPersonService';
import {catchError, of, tap} from 'rxjs';
import {InvolvedPersonAddedObserver} from './InvolvedPersonAddedObserver';
import {InvolvedPersonCreatedObserver} from './InvolvedPersonCreatedObserver';
import {InvolvedPersonsLoadedObserver} from './InvolvedPersonsLoadedObserver';
import {InvolvedPersonDeletedObserver} from './InvolvedPersonDeletedObserver';

@Injectable({
  providedIn: 'root'
})
export class InvolvedPersonSubject {

  private readonly involvedService = inject(InvolvedPersonService);

  private readonly involvedPersonsLoadedObservers: InvolvedPersonsLoadedObserver[] = [];
  private readonly involvedPersonAddedObservers: InvolvedPersonAddedObserver[] = [];
  private readonly involvedPersonCreatedObservers: InvolvedPersonCreatedObserver[] = [];
  private readonly involvedPersonDeletedObservers: InvolvedPersonDeletedObserver[] = [];

  private involvedPersonsSignal = signal<InvolvedPerson[]>([]);

  private selectedInvolvedPersonSignal = signal<InvolvedPerson | null>(null);
  private involvedPersonAdded: InvolvedPerson | null = null;

  constructor() {
    this.involvedService.findAll().pipe(
      catchError(err => {
        this.notifyInvolvedPersonsLoadedError("Failed to load involved persons.");
        return of([]);
      })
    ).subscribe(persons => {
      this.notifyInvolvedPersonsLoaded(persons);
    });
  }

  public registerInvolvedPersonsLoadedObserver(observer: InvolvedPersonsLoadedObserver): void {
    this.involvedPersonsLoadedObservers.push(observer);
  }

  public registerInvolvedPersonAddedObserver(observer: InvolvedPersonAddedObserver): void {
    this.involvedPersonAddedObservers.push(observer);
  }

  public registerInvolvedPersonCreatedObserver(observer: InvolvedPersonCreatedObserver): void {
    this.involvedPersonCreatedObservers.push(observer);
  }

  public registerInvolvedPersonDeletedObserver(observer: InvolvedPersonDeletedObserver): void {
    this.involvedPersonDeletedObservers.push(observer);
  }

  public notifyInvolvedPersonsLoaded(involvedPersons: InvolvedPerson[]): void {
    this.involvedPersonsLoadedObservers.forEach(observer => observer.involvedPersonsLoaded(involvedPersons));
  }

  public notifyInvolvedPersonsLoadedError(errorMessage: string): void {
    this.involvedPersonsLoadedObservers.forEach(observer => observer.involvedPersonsLoadedError(errorMessage));
  }

  public notifyInvolvedPersonCreated(involvedPerson: InvolvedPerson): void {
    this.involvedPersonCreatedObservers.forEach(observer => observer.involvedPersonCreated(involvedPerson));
  }

  public notifyInvolvedPersonCreatedError(errorMessage: string): void {
    this.involvedPersonCreatedObservers.forEach(observer => observer.involvedPersonCreatedError(errorMessage));
  }

  public notifyInvolvedPersonDeleted(involvedPerson: InvolvedPerson): void {
    this.involvedPersonDeletedObservers.forEach(observer => observer.involvedPersonDeleted(involvedPerson));
  }

  public notifyInvolvedPersonDeletedError(errorMessage: string): void {
    this.involvedPersonDeletedObservers.forEach(observer => observer.involvedPersonDeletedError(errorMessage));
  }

  public notifyInvolvedPersonAdded(involvedPerson: InvolvedPerson): void {
    this.involvedPersonAddedObservers.forEach(observer => observer.involvedPersonAdded(involvedPerson));
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

  public deleteInvolvedPerson(involvedPerson: InvolvedPerson): void {
    this.involvedService.delete(involvedPerson).pipe(
      tap(() => {
        this.involvedPersonsSignal.update(current => current.filter(p => p.id !== involvedPerson.id));
        this.notifyInvolvedPersonDeleted(involvedPerson);
      }),
      catchError(err => {
        this.notifyInvolvedPersonDeletedError("Failed to delete involved person.");
        return of(null);
      })
    ).subscribe();
  }
}
