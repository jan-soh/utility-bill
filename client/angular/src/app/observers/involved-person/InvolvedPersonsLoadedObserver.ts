import {InvolvedPerson} from '../../model/InvolvedPerson';

export interface InvolvedPersonsLoadedObserver {

  involvedPersonsLoaded(involvedPersons: InvolvedPerson[]): void;

  involvedPersonsLoadedError(error: string): void;
}
