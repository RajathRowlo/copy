import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  username: String
  Name=""
  constructor(private router: Router, private us:UserService) { }

  ngOnInit(): void {
    //get username from local storage
    this.username=localStorage.getItem("username")
  }

  logOut(){
    localStorage.clear();
    //navigate to login
    this.router.navigateByUrl("/login")
  }
}
