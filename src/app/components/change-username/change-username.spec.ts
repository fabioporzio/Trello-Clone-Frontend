import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUsername } from './change-username';

describe('ChangeUsername', () => {
  let component: ChangeUsername;
  let fixture: ComponentFixture<ChangeUsername>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeUsername]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeUsername);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
