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

  handleFileInput(files: FileList): void {
    this.file = files.item(0);
  }

  onSubmit(): void {
    this.service.createActivity(this.file).subscribe(
      (data) => {
        this.router.navigateByUrl('/');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
