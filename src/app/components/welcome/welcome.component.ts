import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  exam :any

  constructor( public router: Router) { }

  ngOnInit(): void {
  }
  setExam(exam:string,examName:string){
    localStorage.setItem('exam',exam);
    localStorage.setItem('examName',examName);
    this.exam = localStorage.getItem('exam');
    if (exam === "0" || exam === "1" ){
      this.router.navigate(['register-user']);

    }
    // console.log(exam);
  }
  // getExam(){
  //   let myItem = localStorage.getItem('exam');
  //   console.log(myItem)
  // }

}
