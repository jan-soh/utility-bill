import {InvolvedPerson} from '../../model/InvolvedPerson';

export interface InvolvedPersonRequestedForAddingObserver {
  involvedPersonRequestedForAdding(involvedPerson: InvolvedPerson): void;
}
