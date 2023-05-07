import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PersonalDetailsComponent } from './personal-details.component';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PersonalDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalDetailsRoutingModule { }
