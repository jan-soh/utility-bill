import {InvolvedPerson} from '../../model/involved-person';

export interface InvolvedPersonCreatedObserver {
  involvedPersonCreated(involvedPerson: InvolvedPerson): void;
}
