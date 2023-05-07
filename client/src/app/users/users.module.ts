import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { DetailsComponent } from './details/details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersComponent, DetailsComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule
  ],
  exports: [UsersComponent]
})
export class UsersModule { }
