import {Injectable, signal, inject, Signal} from '@angular/core';
import {InvolvedPerson} from '../model/InvolvedPerson';
import {InvolvedPersonService} from './InvolvedPersonService';
import {catchError, map, Observable, of, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvolvedPersonSubject {
  private involvedService = inject(InvolvedPersonService);
  private involvedPersonsSignal = signal<InvolvedPerson[]>([]);
  private selectedInvolvedPersonSignal = signal<InvolvedPerson | null>(null);

  private errorSignal = signal<string | null>(null);

  public readonly involvedPersons: Signal<InvolvedPerson[]> = this.involvedPersonsSignal.asReadonly();
  public readonly error: Signal<string | null> = this.errorSignal.asReadonly();

  constructor() {
    this.involvedService.findAll().pipe(
      catchError(err => {
        this.errorSignal.set('Failed to load involved persons.');
        return of([]);
      })
    ).subscribe(persons => {
      this.involvedPersonsSignal.set(persons);
    });
  }

  public apply(involvedPerson: InvolvedPerson): Observable<boolean> {
    this.errorSignal.set(null);
    return this.involvedService.save(involvedPerson).pipe(
      tap(savedInvolvedPerson => {
        this.involvedPersonsSignal.update(current => {
          const index = current.findIndex(p => p.id === savedInvolvedPerson.id);
          if (index > -1) {
            return current.map((p, i) => i === index ? savedInvolvedPerson : p);
          } else {
            return [...current, savedInvolvedPerson];
          }
        });
      }),
      map(() => true),
      catchError(() => {
        this.errorSignal.set('Failed to save involved person.');
        return of(false);
      })
    );
  }

  public clearError(): void {
    this.errorSignal.set(null);
  }
}
