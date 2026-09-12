import { Routes } from '@angular/router';
import { Overview } from './page/overview/overview';
import { AddExpense } from './page/add-expense/add-expense';
import { AddInvolved } from './page/add-involved/add-involved';
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
    path: 'add-involved',
    component: AddInvolved
  },
  {
    path: 'account',
    component: Account
  }
];
