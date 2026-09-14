import {InvolvedPerson} from '../../model/InvolvedPerson';

export interface InvolvedPersonCreatedObserver {
  involvedPersonCreated(involvedPerson: InvolvedPerson): void;

  involvedPersonCreatedError(error: string): void;
}
