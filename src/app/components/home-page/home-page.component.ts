import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TestDialogComponent } from '../test-dialog/test-dialog.component';
import { Router } from '@angular/router';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomePageComponent implements OnInit {

  user: firebase.User;

  constructor(public dialog: MatDialog, private router: Router, private auth:AuthService) {
    
   }

  ngOnInit(): void {
    this.auth.authState()
    .subscribe( user => {
      this.user = user;
      
    })
  }

  openDialog(){
    this.dialog.open(TestDialogComponent);
  }

  logout() {
    this.auth.SignOut();
  }
}
