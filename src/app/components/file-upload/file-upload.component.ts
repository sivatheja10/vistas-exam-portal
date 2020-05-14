import { Component } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  user: firebase.User;

  constructor(public dialog: MatDialog, private auth:AuthService) {
    
   }

  ngOnInit(): void {
    this.auth.authState()
    .subscribe( user => {
      this.user = user;
      
    })
  }


  isHovering: boolean;

  files: File[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }


   logout() {
    this.auth.SignOut();
  }
}