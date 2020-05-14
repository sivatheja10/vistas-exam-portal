import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor( public router: Router) { }

  ngOnInit(): void {
  }
  setExam(exam:string){
    localStorage.setItem('exam',exam);
    // console.log(exam);
    this.router.navigate(['register-user']);
  }
  // getExam(){
  //   let myItem = localStorage.getItem('exam');
  //   console.log(myItem)
  // }

}
