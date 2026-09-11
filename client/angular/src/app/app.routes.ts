import { Routes } from '@angular/router';
import { Overview } from './overview/overview';
import { AddExpense } from './add-expense/add-expense';
import { AddInvolved } from './add-involved/add-involved';
import { Account } from './account/account';

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
    path: 'add-involved',
    component: AddInvolved
  },
  {
    path: 'account',
    component: Account
  }
];
