import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoshFollowersComponent } from './mosh-followers.component';

describe('MoshFollowersComponent', () => {
  let component: MoshFollowersComponent;
  let fixture: ComponentFixture<MoshFollowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoshFollowersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoshFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
