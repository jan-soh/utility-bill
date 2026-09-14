import {InvolvedPerson} from '../../model/InvolvedPerson';

export interface InvolvedPersonAddedObserver {
  involvedPersonAdded(involvedPerson: InvolvedPerson): void;
}
