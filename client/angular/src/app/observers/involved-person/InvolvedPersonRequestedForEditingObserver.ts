import {InvolvedPerson} from '../../model/InvolvedPerson';

export interface InvolvedPersonRequestedForEditingObserver {
  involvedPersonRequestedForEditing(involvedPerson: InvolvedPerson): void;

  involvedPersonRequestedForEditingError(errorMessage: string): void;
}
