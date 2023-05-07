import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [WelcomeComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    RouterModule,
    FormsModule
  ],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
