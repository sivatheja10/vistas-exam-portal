import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


// Reactive Form
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from '@angular/forms';


//Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


// App routing modules
import { AppRoutingModule, routingComponents } from './shared/routing/app-routing.module';

// App components
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { WelcomeComponent } from './components/welcome/welcome.component'
import { TestDialogComponent } from './components/test-dialog/test-dialog.component';
import { SubmissionComponent } from './components/submission/submission.component';


// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask,
  StorageBucket
} from "@angular/fire/storage";

// Auth service
import { AuthService } from "./shared/services/auth.service";
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { DropzoneDirective } from './dropzone.directive';
import { UploadTaskComponent } from './components/upload-task/upload-task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreditsComponent } from './components/credits/credits.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    FileUploadComponent,
    DropzoneDirective,
    UploadTaskComponent,
    WelcomeComponent,
    routingComponents,
    TestDialogComponent,
    SubmissionComponent,
    CreditsComponent,
    
  ],
  entryComponents: [TestDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    MatToolbarModule,
    MatCardModule,
    MatToolbarModule,
    MatCardModule,
    FontAwesomeModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})

export class AppModule { }