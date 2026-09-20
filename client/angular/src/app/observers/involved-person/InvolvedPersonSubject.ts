import {inject, Injectable, signal} from '@angular/core';
import {InvolvedPerson} from '../../model/InvolvedPerson';
import {InvolvedPersonService} from '../../service/InvolvedPersonService';
import {catchError, of, tap} from 'rxjs';
import {InvolvedPersonRequestedForAddingObserver} from './InvolvedPersonRequestedForAddingObserver';
import {InvolvedPersonRequestedForEditingObserver} from './InvolvedPersonRequestedForEditingObserver';
import {InvolvedPersonCreatedObserver} from './InvolvedPersonCreatedObserver';
import {InvolvedPersonsLoadedObserver} from './InvolvedPersonsLoadedObserver';
import {InvolvedPersonDeletedObserver} from './InvolvedPersonDeletedObserver';

@Injectable({
  providedIn: 'root'
})
export class InvolvedPersonSubject {

  private readonly involvedPersonService = inject(InvolvedPersonService);

  private readonly involvedPersonsLoadedObservers: InvolvedPersonsLoadedObserver[] = [];
  private readonly involvedPersonRequestedForAddingObservers: InvolvedPersonRequestedForAddingObserver[] = [];
  private readonly involvedPersonRequestedForEditingObservers: InvolvedPersonRequestedForEditingObserver[] = [];
  private readonly involvedPersonCreatedObservers: InvolvedPersonCreatedObserver[] = [];
  private readonly involvedPersonDeletedObservers: InvolvedPersonDeletedObserver[] = [];

  private involvedPersonsSignal = signal<InvolvedPerson[]>([]);

  private selectedInvolvedPersonSignal = signal<InvolvedPerson | null>(null);
  private involvedPersonAdded: InvolvedPerson | null = null;

  constructor() {
    this.involvedPersonService.findAll().pipe(
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

  public registerInvolvedPersonRequestedForAddingObserver(observer: InvolvedPersonRequestedForAddingObserver): void {
    this.involvedPersonRequestedForAddingObservers.push(observer);
  }

  public registerInvolvedPersonRequestedForEditingObserver(observer: InvolvedPersonRequestedForEditingObserver): void {
    this.involvedPersonRequestedForEditingObservers.push(observer);
  }

  public registerInvolvedPersonCreatedObserver(observer: InvolvedPersonCreatedObserver): void {
    this.involvedPersonCreatedObservers.push(observer);
  }

  public registerInvolvedPersonDeletedObserver(observer: InvolvedPersonDeletedObserver): void {
    this.involvedPersonDeletedObservers.push(observer);
  }

  private notifyInvolvedPersonsLoaded(involvedPersons: InvolvedPerson[]): void {
    this.involvedPersonsLoadedObservers.forEach(observer => observer.involvedPersonsLoaded(involvedPersons));
  }

  private notifyInvolvedPersonRequestedForAdding(involvedPerson: InvolvedPerson): void {
    this.involvedPersonRequestedForAddingObservers.forEach(observer => observer.involvedPersonRequestedForAdding(involvedPerson));
  }

  private notifyInvolvedPersonRequestedForEditing(involvedPerson: InvolvedPerson): void {
    this.involvedPersonRequestedForEditingObservers.forEach(observer => observer.involvedPersonRequestedForEditing(involvedPerson));
  }

  private notifyInvolvedPersonRequestedForEditingError(errorMessage: string): void {
    this.involvedPersonRequestedForEditingObservers.forEach(observer => observer.involvedPersonRequestedForEditingError(errorMessage));
  }


  private notifyInvolvedPersonsLoadedError(errorMessage: string): void {
    this.involvedPersonsLoadedObservers.forEach(observer => observer.involvedPersonsLoadedError(errorMessage));
  }

  private notifyInvolvedPersonCreated(involvedPerson: InvolvedPerson): void {
    this.involvedPersonCreatedObservers.forEach(observer => observer.involvedPersonCreated(involvedPerson));
  }

  private notifyInvolvedPersonCreatedError(errorMessage: string): void {
    this.involvedPersonCreatedObservers.forEach(observer => observer.involvedPersonCreatedError(errorMessage));
  }

  private notifyInvolvedPersonDeleted(involvedPerson: InvolvedPerson): void {
    this.involvedPersonDeletedObservers.forEach(observer => observer.involvedPersonDeleted(involvedPerson));
  }

  private notifyInvolvedPersonDeletedError(errorMessage: string): void {
    this.involvedPersonDeletedObservers.forEach(observer => observer.involvedPersonDeletedError(errorMessage));
  }

  public requestAddInvolvedPerson(): void {
    this.involvedPersonAdded = new InvolvedPerson();
    this.notifyInvolvedPersonRequestedForAdding(this.involvedPersonAdded);
  }

  public requestEditInvolvedPerson(involvedPersonid: string): void {

    this.involvedPersonService.findById(involvedPersonid).pipe(
      tap(involvedPersonLoaded => {
        this.notifyInvolvedPersonRequestedForEditing(involvedPersonLoaded);
        return of(involvedPersonLoaded);
      }),
      catchError(err => {
        this.notifyInvolvedPersonRequestedForEditingError("Failed to load involved person for editing.");
        return of(null);
      })
    ).subscribe();
  }

  public createInvolvedPerson(involvedPerson: InvolvedPerson): void {
    if (!involvedPerson) {
      console.error("Can not create involved person, it's is null.");
      return;
    }

    if (involvedPerson.id) {
      console.error("Can not create involved person, an entity with the same id already exists. Use editInvolvedPerson(InvolvedPerson) instead.");
      return;
    }

    this.involvedPersonService.save(involvedPerson).pipe(
      tap(createdPerson => {
        this.involvedPersonsSignal.update(current => {
          const index = current.findIndex(existingPerson => existingPerson.id === createdPerson.id);
          if (index > -1) {
            return current.map((p, i) => i === index ? createdPerson : p);
          } else {
            return [...current, createdPerson];
          }
        });
        this.notifyInvolvedPersonCreated(createdPerson);
      }),
      catchError((err) => {
        this.notifyInvolvedPersonCreatedError("Failed to create involved person.");
        return of(null);
      })
    ).subscribe();
  }

  public updateInvolvedPerson(involvedPerson: InvolvedPerson): void {

    if (!involvedPerson) {
      console.error("Can not create involved person, it's is null.");
      return;
    }

    if (!involvedPerson.id) {
      console.error("Can not update involved person, the entity does not exist yet. Use createInvolvedPerson(InvolvedPerson) instead.");
      return;
    }

    this.involvedPersonService.update(involvedPerson).pipe(
      tap(updatedPerson => {
        this.involvedPersonsSignal.update(persons =>
          persons.map(existingPerson => existingPerson.id === updatedPerson.id ? updatedPerson : existingPerson)
        );
      }),
      catchError(() => {
        this.notifyInvolvedPersonCreatedError("Failed to update involved person.");
        return of(null);
      })
    ).subscribe();
  }

  public deleteInvolvedPerson(involvedPerson: InvolvedPerson): void {
    this.involvedPersonService.delete(involvedPerson).pipe(
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
