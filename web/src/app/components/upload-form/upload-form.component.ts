import { Component } from '@angular/core';
import { ActivityService } from 'src/app/core/activity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
})
export class UploadFormComponent {
  file: File = null;

  constructor(
    private service: ActivityService,
    private router: Router
  ) {}

  handleFileInput(files: FileList) {
    this.file = files.item(0);
  }

  onSubmit() {
    this.service.createActivity(this.file).subscribe(
      (data) => {
        this.router.navigate(['/activity', data.id])
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
