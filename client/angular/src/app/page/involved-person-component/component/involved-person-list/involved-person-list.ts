import {Component, inject, output, signal} from '@angular/core';
import {InvolvedPersonSubject} from '../../../../observers/involved-person/InvolvedPersonSubject';
import {InvolvedPerson} from '../../../../model/InvolvedPerson';
import {InvolvedPersonDeletedObserver} from '../../../../observers/involved-person/InvolvedPersonDeletedObserver';
import {InvolvedPersonsLoadedObserver} from '../../../../observers/involved-person/InvolvedPersonsLoadedObserver';
import {InvolvedPersonCreatedObserver} from '../../../../observers/involved-person/InvolvedPersonCreatedObserver';

@Component({
  selector: 'involved-person-list',
  templateUrl: './involved-person-list.html',
  styleUrl: './involved-person-list.css',
})
export class InvolvedPersonList implements InvolvedPersonsLoadedObserver, InvolvedPersonCreatedObserver, InvolvedPersonDeletedObserver {

  private involvedSubject: InvolvedPersonSubject = inject(InvolvedPersonSubject);

  public involvedList = signal<InvolvedPerson[]>([]);
  public involvedPersonSelected = output<InvolvedPerson>();


  constructor() {
    this.involvedSubject.registerInvolvedPersonDeletedObserver(this);
    this.involvedSubject.registerInvolvedPersonCreatedObserver(this);
    this.involvedSubject.registerInvolvedPersonsLoadedObserver(this);
  }

  public edit(involvedPerson: InvolvedPerson) {
    this.involvedPersonSelected.emit(involvedPerson);
  }

  public delete(involvedPerson: InvolvedPerson) {
    this.involvedSubject.deleteInvolvedPerson(involvedPerson);
  }

  public involvedPersonsLoaded(involvedPersons: InvolvedPerson[]): void {
    this.involvedList.set(involvedPersons);
  }

  public involvedPersonsLoadedError(error: string): void {
    console.error(error);
  }

  public involvedPersonCreated(involvedPerson: InvolvedPerson): void {
    this.involvedList.update(current => [...current, involvedPerson]);
  }

  public involvedPersonCreatedError(error: string): void {
    console.error(error);
  }

  public involvedPersonDeleted(involvedPerson: InvolvedPerson): void {
    this.involvedList.update(current => current.filter(person => person.id !== involvedPerson.id));
  }

  public involvedPersonDeletedError(error: string): void {
    console.error(error);
  }
}
