import {computed, inject, Injectable, signal} from '@angular/core';
import {InvolvedPersonService} from '../service/InvolvedPersonService';
import {InvolvedPerson} from '../model/InvolvedPerson';
import {Observable, tap} from 'rxjs';

@Injectable({providedIn: 'root'})
export class InvolvedPersonStore {

  private readonly service = inject(InvolvedPersonService);

  private readonly _persons = signal<InvolvedPerson[]>([]);
  private readonly _selectedPerson = signal<InvolvedPerson | null>(null);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly persons = this._persons.asReadonly();
  readonly selectedPerson = this._selectedPerson.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly hasError = computed(() => this._error() !== null);
  readonly hasSelectedPerson = computed(() => this._selectedPerson() !== null);

  load(): void {
    this._isLoading.set(true);
    this.service.findAll().subscribe({
      next: persons => {
        this._persons.set(persons);
        this._isLoading.set(false);
      },
      error: err => {
        this._error.set('Failed to load persons.');
        this._isLoading.set(false);
      }
    });
  }

  add() {
    const person = new InvolvedPerson();
    this.select(person);
  }

  select(involvedPerson: InvolvedPerson): void {
    this._selectedPerson.set({...involvedPerson});
  }

  deselect(): void {
    this._selectedPerson.set(null);
  }

  create(person: InvolvedPerson): Observable<InvolvedPerson> {
    return this.service.save(person).pipe(
      tap(created => {
        this._persons.update(list => [...list, created]);
        this._selectedPerson.set(null);
      })
    )
  }

  update(person: InvolvedPerson): void {
    this.service.update(person).subscribe({
      next: updated => {
        this._persons.update(list =>
          list.map(p => p.id === updated.id ? updated : p)
        );
        this._selectedPerson.set(null);
      },
      error: (err) => {
        this._error.set('Failed to update person.')
      }
    });
  }

  delete(person: InvolvedPerson): void {
    this.service.delete(person).subscribe({
      next: () => {
        this._persons.update(list => list.filter(p => p.id !== person.id));
      },
      error: () => this._error.set('Failed to delete person.')
    });
  }
}
