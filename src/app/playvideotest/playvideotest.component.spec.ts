import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayvideotestComponent } from './playvideotest.component';

describe('PlayvideotestComponent', () => {
  let component: PlayvideotestComponent;
  let fixture: ComponentFixture<PlayvideotestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayvideotestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayvideotestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
