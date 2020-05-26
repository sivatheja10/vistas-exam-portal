import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {  NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { QuizService } from '../../services/quiz.service';
import { HelperService } from '../../services/helper.service';
import { Option, Question, Quiz, QuizConfig } from '../../models/index';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as firebase from 'firebase';
import { CommonModule } from '@angular/common';
import { User } from "../../shared/services/user";



@Component({
  selector: 'app-exam-question',
  templateUrl: `./exam-question.component.html`,
  styleUrls: ['./exam-question.component.css'],
  providers: [QuizService]
})
export class ExamQuestionComponent implements OnInit {

  user: any;

  exam: any;
  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string;
  correctAnswerCount: number = 0;

  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 1800,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';

  constructor(private quizService: QuizService,public afs: AngularFirestore, public auth:AuthService, public router: Router, public ngZone: NgZone) {
   }

  ngOnInit() {
    this.exam = localStorage.getItem('exam');
    console.log(this.exam);
    this.quizes = this.quizService.getAll();
    this.quizName = this.quizes[this.exam].id;
    console.log(this.quizName);
    this.loadQuiz(this.quizName);
    this.correctAnswerCount = 0;

    //Auth state
   this.user = this.auth.authState()
    .subscribe( user => {
      return this.afs.doc<User>(`users/${user.uid}`).valueChanges();

    })
    console.log('User from ec:'+this.user.examCompleted)

  }

  loadQuiz(quizName: string) {
    this.quizService.get(quizName).subscribe(res => {
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.timer = setInterval(() => { this.tick(); }, 1000);
      this.duration = this.parseTime(this.config.duration);
    });
    this.mode = 'quiz';
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {
    if(question.options.every(x => x.selected == x.isAnswer)){
      this.correctAnswerCount++
      // console.log(this.correctAnswerCount)
      // console.log('Score increased')
      return question.options.every(x => x.selected == x.isAnswer) ? 'Correct' : 'Wrong'  };

    }

  onSubmit() {
    var date = firebase.firestore.Timestamp.now();
    this.quiz.questions.forEach(qn => this.isCorrect(qn));
    // Post your data to the server here. answers contains the questionId and the users' answer.
    
    this.ngZone.run(() => {
      this.router.navigate(['submission']);
    });

    
    this.afs.collection('users').doc(`${this.user.uid}`).set({
      Score : this.correctAnswerCount,
      SubmissionTime : date,
      examCompleted : true
    },{
      merge: true
    });
    // console.log(this.quiz.questions);
    this.mode = 'result';
  }
}
