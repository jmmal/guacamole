import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedActivityComponent } from './detailed-activity.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DetailedActivityComponent', () => {
  let component: DetailedActivityComponent;
  let fixture: ComponentFixture<DetailedActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedActivityComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
