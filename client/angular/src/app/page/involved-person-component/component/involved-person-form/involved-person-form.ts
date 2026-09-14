import {Component, inject, signal} from '@angular/core';
import {InvolvedPerson} from '../../../../model/InvolvedPerson';
import {InvolvedPersonSubject} from '../../../../observers/involved-person/InvolvedPersonSubject';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {InvolvedPersonAddedObserver} from '../../../../observers/involved-person/InvolvedPersonAddedObserver';
import {InvolvedPersonCreatedObserver} from '../../../../observers/involved-person/InvolvedPersonCreatedObserver';

@Component({
  selector: 'involved-person-form',
  templateUrl: './involved-person-form.html',
  styleUrl: './involved-person-form.css',
  imports: [FormsModule, CommonModule],
})
export class InvolvedPersonForm implements InvolvedPersonAddedObserver, InvolvedPersonCreatedObserver {

  private readonly involvedPersonSubject: InvolvedPersonSubject = inject(InvolvedPersonSubject);

  visible = signal<boolean>(false);
  saving: boolean = false;
  involvedPerson = signal<InvolvedPerson | null>(null);
  errorMessage = signal<string | null>(null);
  actionMessage = signal<string | null>(null);

  constructor() {
    this.involvedPersonSubject.registerInvolvedPersonAddedObserver(this);
    this.involvedPersonSubject.registerInvolvedPersonCreatedObserver(this);
  }

  public involvedPersonAdded(involvedPerson: InvolvedPerson) {
    this.involvedPerson.set(involvedPerson);
    this.visible.set(true);
  }

  public involvedPersonCreated(involvedPerson: InvolvedPerson): void {
    this.saving = false;
    this.visible.set(false);
  }

  public involvedPersonCreatedError(error: string): void {
    this.errorMessage.set(error);
    this.saving = false;
  }

  public save(): void {

    if (this.isValidForSave()) {

      this.saving = true;
      this.involvedPersonSubject.createInvolvedPerson();
    }
  }

  private isValidForSave(): boolean {

    const involvedPerson = this.involvedPerson();

    if (!involvedPerson) {
      return false;
    }

    if (!involvedPerson.name) {
      this.actionMessage.set('Name is required');
      return false;
    }
    if (!involvedPerson.startOfInvolvement) {
      this.actionMessage.set('Start of involvement is required');
      return false;
    }

    return true;
  }

  public reset(): void {
    this.actionMessage.set(null);
  }
}
