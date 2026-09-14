import { Routes } from '@angular/router';
import { Overview } from './page/overview/overview';
import { AddExpense } from './page/add-expense/add-expense';
import { InvolvedPersonComponent } from './page/involved-person-component/involved-person-component';
import { Account } from './page/account/account';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  },
  {
    path: 'overview',
    component: Overview
  },
  {
    path: 'add-expense',
    component: AddExpense
  },
  {
    path: 'involved-person',
    component: InvolvedPersonComponent
  },
  {
    path: 'account',
    component: Account
  }
];
