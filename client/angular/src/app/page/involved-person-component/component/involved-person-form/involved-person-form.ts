import {Component, computed, inject, signal} from '@angular/core';
import {InvolvedPerson} from '../../../../model/InvolvedPerson';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {InvolvedPersonStore} from '../../../../store/InvolvedPersonStore';

@Component({
  selector: 'involved-person-form',
  templateUrl: './involved-person-form.html',
  styleUrl: './involved-person-form.css',
  imports: [FormsModule, CommonModule],
})
export class InvolvedPersonForm {

  readonly store = inject(InvolvedPersonStore);
  readonly visible = computed(() => this.store.hasSelectedPerson());

  private readonly _localError = signal<string | null>(null);

  readonly errorSignal = computed(() => {
    if (this._localError()) {
      return this._localError();
    } else if (this.store.error()) {
      return this.store.error();
    }
    return null;
  });

  public create(): void {

    const involvedPerson = this.store.selectedPerson();

    if (this.isValidForCreate(involvedPerson)) {

      this.store.create(involvedPerson);
    }
  }

  private isValidForCreate(involvedPerson: InvolvedPerson | null): involvedPerson is InvolvedPerson {

    if (!involvedPerson) {
      this._localError.set('This involved person can not be created.');
      console.error('involvedPerson is null');
      return false;
    }

    if (!involvedPerson.name) {
      this._localError.set('Name is required.');
      return false;
    }
    if (!involvedPerson.startOfInvolvement) {
      this._localError.set("Start of involvement is required.");
      return false;
    }

    return true;
  }

  public update(): void {

    const involvedPerson = this.store.selectedPerson();

    if (this.isValidForUpdate(involvedPerson)) {

      this.store.update(involvedPerson);
    }
  }

  private isValidForUpdate(involvedPerson: InvolvedPerson | null): involvedPerson is InvolvedPerson {

    const isValidForSave = this.isValidForCreate(involvedPerson);

    if (!isValidForSave) {
      return false;
    }

    if (!involvedPerson?.id) {

      this._localError.set('This involved person can not be updated.');
      console.error('involvedPerson.id is null');
      return false;
    }

    return true;
  }

  public cancel(): void {
    this.store.deselect();
  }
}
