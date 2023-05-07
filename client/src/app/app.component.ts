import { Component } from '@angular/core';

// Decorators
@Component({
  selector: 'app-root', // HTML tag
  // template: '<h1>HELLO!</h1>',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PRF';

  myObject: any = {};

  constructor() {
    this.myObject['title'] = this.title;
  }
}
