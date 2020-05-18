import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {

  user: firebase.User;
  loggedUser = JSON.parse(localStorage.getItem('user'));


  constructor(public dialog: MatDialog, private router: Router, private auth:AuthService) {
    
   }

  ngOnInit(): void {
    this.auth.authState()
    .subscribe( user => {
      this.user = user;
      
    })
  }


  logout() {
    this.auth.SignOut();
  }
}
