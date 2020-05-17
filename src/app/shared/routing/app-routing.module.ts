import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import{ FileUploadComponent } from '../../components/file-upload/file-upload.component';
import{ WelcomeComponent } from '../../components/welcome/welcome.component';
import { HomePageComponent } from '../../components/home-page/home-page.component';
import { ExamQuestionComponent } from '../../components/exam-question/exam-question.component';
import { SubmissionComponent } from '../../components/submission/submission.component';
import { CreditsComponent } from '../../components/credits/credits.component';


import { AuthGuard } from "../../shared/guard/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent},
  { path: 'register-user', component: SignUpComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'upload', component: FileUploadComponent,canActivate: [AuthGuard] },
  { path: 'welcome', component: WelcomeComponent},
  { path: 'questions', component: ExamQuestionComponent,canActivate: [AuthGuard]},
  { path: 'home', component: HomePageComponent,canActivate: [AuthGuard]},
  { path: 'submission', component:SubmissionComponent,canActivate: [AuthGuard] },
  { path: 'credits', component:CreditsComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [ExamQuestionComponent, HomePageComponent]
