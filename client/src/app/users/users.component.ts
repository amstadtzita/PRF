import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // structural directives: *ngIf, *ngSwitch, *ngFor
  // attribute directives

  users?: User[];
  chosenUser?: User;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  openDetails(user: User) {
    this.chosenUser = user;
  }

  receiveUser(event: any) {
    console.log(event);
  }

  delete(user: User) {
    this.userService.deleteUser(user).subscribe(
    () => {
      console.log('User deleted successfully');
      this.router.navigate([this.router.url]);
    }
  );
  }


}
