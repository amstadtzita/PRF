import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {

  chosenUser?: User;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => { this.chosenUser = JSON.parse(params['user']);
  });

  }

  openDetails(user: User) {
    this.chosenUser = user;
  }

  receiveUser(event: any) {
    console.log(event);
  }

  logout() {
    this.userService.logout().subscribe(() => {
       this.router.navigateByUrl('/welcome');
    });
  }

  sendBackResult(){}


}
