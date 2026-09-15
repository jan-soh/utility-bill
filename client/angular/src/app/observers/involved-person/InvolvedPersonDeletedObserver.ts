import {InvolvedPerson} from '../../model/InvolvedPerson';

export interface InvolvedPersonDeletedObserver {

  involvedPersonDeleted(involvedPerson: InvolvedPerson): void;

  involvedPersonDeletedError(error: string): void;
}
