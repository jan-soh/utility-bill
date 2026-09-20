import {Component, inject} from '@angular/core';
import {InvolvedPerson} from '../../../../model/InvolvedPerson';
import {InvolvedPersonStore} from '../../../../store/InvolvedPersonStore';

@Component({
  selector: 'involved-person-list',
  templateUrl: './involved-person-list.html',
  styleUrl: './involved-person-list.css',
})
export class InvolvedPersonList {

  protected readonly store = inject(InvolvedPersonStore);


  ngOnInit() {
    this.store.load();
  }

  public edit(involvedPerson: InvolvedPerson) {
    this.store.select(involvedPerson);
  }

  public delete(involvedPerson: InvolvedPerson) {
    this.store.delete(involvedPerson);
  }
}
