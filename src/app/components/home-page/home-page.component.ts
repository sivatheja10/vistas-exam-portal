import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TestDialogComponent } from '../test-dialog/test-dialog.component';
import { Router } from '@angular/router';
import { AuthService } from "../../shared/services/auth.service";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';


@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomePageComponent implements OnInit {

  user: firebase.User;
  loggedUser = JSON.parse(localStorage.getItem('user'));
  

  constructor(public dialog: MatDialog, private router: Router, private auth:AuthService,public afs: AngularFirestore) {
    
   }

  ngOnInit(): void {
    this.auth.authState()
    .subscribe( user => {
      this.user = user;
      
    })
  }

  saveExamStartTime(){
    console.log("save time Called")
    var date = firebase.firestore.Timestamp.now();
    this.afs.collection('users').doc(`${this.user.uid}`).set({
      StartTime : date,  
      ExamName : localStorage.getItem('examName') 
     },{
      merge: true
    }).then(()=>{
      console.log('Saved Exam start info successfull!')
    });

  }


  logout() {
    this.auth.SignOut();
  }
}
