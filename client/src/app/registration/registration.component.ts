import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../model/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User = {username: '', email: '', password: '', name: '', address: ''};

  // Angular Services
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  register() {
    console.log( this.user.username, this.user.email, this.user.password, this.user.name, this.user.address );
    this.userService.register(this.user.username, this.user.email, this.user.password, this.user.name, this.user.address)
    .subscribe(() => {
      console.log('Registration successful!');
      this.router.navigateByUrl('/login');
    });
  }

}
