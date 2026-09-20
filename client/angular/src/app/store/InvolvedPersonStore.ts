import {computed, inject, Injectable, signal} from '@angular/core';
import {InvolvedPersonService} from '../service/InvolvedPersonService';
import {InvolvedPerson} from '../model/InvolvedPerson';

@Injectable({providedIn: 'root'})
export class InvolvedPersonStore {

  private readonly service = inject(InvolvedPersonService);

  // --- State ---
  private readonly _persons = signal<InvolvedPerson[]>([]);
  private readonly _selectedPerson = signal<InvolvedPerson | null>(null);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  // --- Public read-only state ---
  readonly persons = this._persons.asReadonly();
  readonly selectedPerson = this._selectedPerson.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();

  // --- Computed state ---
  readonly hasError = computed(() => this._error() !== null);

  // --- Actions ---<
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

  select(person: InvolvedPerson): void {
    this._selectedPerson.set({...person}); // copy to avoid mutating list
  }

  create(person: InvolvedPerson): void {
    this.service.save(person).subscribe({
      next: created => {
        this._persons.update(list => [...list, created]);
        this._selectedPerson.set(null);
      },
      error: () => this._error.set('Failed to create person.')
    });
  }

  update(person: InvolvedPerson): void {
    this.service.update(person).subscribe({
      next: updated => {
        this._persons.update(list =>
          list.map(p => p.id === updated.id ? updated : p)
        );
        this._selectedPerson.set(null);
      },
      error: () => this._error.set('Failed to update person.')
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
