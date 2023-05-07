import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersModule } from './users/users.module';
import { WelcomeModule } from './welcome/welcome.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './welcome/product-details/product-details.component';
import { OtherComponent } from './other/other.component';
import { OtherRoutingModule } from './other/other-routing.module';
import { OtherModule } from './other/other.module';
import { PersonalDetailsModule } from './personal-details/personal-details.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsersModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
