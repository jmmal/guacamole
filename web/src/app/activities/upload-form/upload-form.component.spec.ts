import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFormComponent } from './upload-form.component';
import { ActivityService } from 'src/app/core/activity.service';
import { Router } from '@angular/router';

class ActivityServiceStub {

}

describe('UploadFormComponent', () => {
  let component: UploadFormComponent;
  let fixture: ComponentFixture<UploadFormComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFormComponent ],
      providers: [
        { provide: ActivityService, useClass: ActivityServiceStub },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
