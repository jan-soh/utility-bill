import {Component, computed, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {InvolvedPersonStore} from '../../../../store/InvolvedPersonStore';
import {ErrorResponseMessageBuilder} from '../../../../errorhandling/ErrorResponseMessageBuilder';

@Component({
  selector: 'involved-person-form',
  templateUrl: './involved-person-form.html',
  styleUrl: './involved-person-form.css',
  imports: [FormsModule, CommonModule],
})
export class InvolvedPersonForm {

  readonly store = inject(InvolvedPersonStore);
  readonly errorResponseMessageBuilder = inject(ErrorResponseMessageBuilder);
  readonly visible = computed(() => this.store.hasSelectedPerson());

  private readonly _localError = signal<string | null>(null);

  readonly errorSignal = computed(() => {
    if (this._localError()) {
      return this._localError();
    } else if (this.store.error()) {
      return this.store.error();
    }
    return null;
  });

  private readonly _fieldLabels: Record<string, string> = {
    'name': 'Name',
    'startOfInvolvement': 'Start Date',
    'endOfInvolvement': 'End Date',
    'involvedPersonDTO': 'Date Range'
  };

  public create(): void {

    const involvedPerson = this.store.selectedPerson();
    if (!involvedPerson) {
      return;
    }

    this.store.create(involvedPerson).subscribe({
      error: (err) => {
        const errorMessage =
          this._localError.set(this.errorResponseMessageBuilder.build(err, this._fieldLabels));
      }
    });
  }


  public update(): void {

    const involvedPerson = this.store.selectedPerson();

    if (!involvedPerson) {
      return;
    }

    this.store.update(involvedPerson);
  }

  public cancel(): void {
    this.store.deselect();
  }
}
