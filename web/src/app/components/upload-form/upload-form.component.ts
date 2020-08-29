import { Component, OnDestroy } from '@angular/core';
import { ActivityService } from 'src/app/core/activity.service';
import { Router } from '@angular/router';

import { SubSink } from 'subsink';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
})
export class UploadFormComponent implements OnDestroy {
  private subs = new SubSink();

  file: File = null;
  loading = false;

  constructor(
    private service: ActivityService,
    private router: Router
  ) {}

  handleFileInput(files: FileList): void {
    this.file = files.item(0);
  }

  onSubmit(): void {
    this.loading = true;
    this.subs.sink = this.service.createActivity(this.file).subscribe(
      (data) => {
        this.router.navigateByUrl('/');
        this.loading = true;
      },
      (error) => {
        console.log(error);
        this.loading = true;
      }
    );
  }

  get submitDisabled(): boolean {
    return this.file === null ? true : null;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
