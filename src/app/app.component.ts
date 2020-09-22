import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  //file upload event  
  fileChange(event) {
    // let fileList: FileList = event.target.files;
    let fileList: FileList = event;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      const uploadUrl = 'http://10.251.49.12:9000/api/excel/uploadexcel';
      this.http.post(uploadUrl, formData).subscribe((res) => {
        console.log('File Uploaded Successfully');
      },
      (err) => {
        // console.log(err);
        // this.showSnackBar('Failed to upload file', 'error-snackbar');
      })
    }
    // this.showSnackBar('File Uploaded Successfully', 'success-snackbar');
    setTimeout(()=>{ window.location.reload();}, 5000);
  }

  showSnackBar(message: string, cssClass: string) {
    this.snackBar.open(message, '', {
      duration: 125000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'success-snackbar'
    });
    // window.location.reload();
  }
}
