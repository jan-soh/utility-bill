import {Injectable, signal, inject, Signal} from '@angular/core';
import {InvolvedPerson} from '../model/InvolvedPerson';
import {InvolvedPersonService} from './InvolvedPersonService';

@Injectable({
  providedIn: 'root'
})
export class InvolvedPersonSubject {
  private involvedService = inject(InvolvedPersonService);
  private involvedPersonsSignal = signal<InvolvedPerson[]>([]);

  public readonly involvedPersons: Signal<InvolvedPerson[]> = this.involvedPersonsSignal.asReadonly();

  constructor() {
    this.involvedService.findAll().subscribe(persons => {
      this.involvedPersonsSignal.set(persons);
    });
  }

  public apply(involvedPerson: InvolvedPerson): void {
    this.involvedService.save(involvedPerson).subscribe(savedInvolvedPerson => {
      this.involvedPersonsSignal.update(current => {
        const index = current.findIndex(p => p.id === savedInvolvedPerson.id);
        if (index > -1) {
          return current.map((p, i) => i === index ? savedInvolvedPerson : p);
        } else {
          return [...current, savedInvolvedPerson];
        }
      });
    });
  }
}
