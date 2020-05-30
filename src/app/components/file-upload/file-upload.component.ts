import { Component } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  user: firebase.User;

  constructor(public dialog: MatDialog, private auth:AuthService,    public router: Router,
    ) {
    
   }

  ngOnInit(): void {
    this.auth.authState()
    .subscribe( user => {
      this.user = user;
      
    })
    this.fileUploaded = false;
  }


  isHovering: boolean;
  fileUploaded: boolean = false;

  files: File[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
      this.fileUploaded = true;
    }
  }


   logout() {
    this.auth.SignOut();
  }

  proceedHandler(){
    if(this.fileUploaded === false){
      window.alert('Please upload to proceed!')
    }
    else{
      this.router.navigate(['home']);

    }
  }
}