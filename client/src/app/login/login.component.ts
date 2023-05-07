import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username?: string;
  password?: string;

  // Angular Services
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }


  navigateToUsersPage() {
    this.userService.login(this.username, this.password).subscribe(
      (res) => {
        console.log('Login successful ');
        this.router.navigate(['/personal-details'], { queryParams: { user: JSON.stringify(res) } });
      }
    );
  }

/*
  navigateToUsersPage() {
    this.userService.login(this.username, this.password)
    .subscribe(userData => {
      console.log(userData);
      this.router.navigateByUrl('/users:id');
    });
  }
 */


}
