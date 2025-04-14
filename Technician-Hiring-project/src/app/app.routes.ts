import { SearchComponent } from './modules/technician/search/search.component';
import { SubmitBidesComponent } from './modules/technician/submit-bides/submit.bides.component';
import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  },
  {
    path: 'submit-bid',
    component: SubmitBidesComponent
  }
];