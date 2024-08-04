import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mql4Mql5Component } from './mql4-mql5.component';

describe('Mql4Mql5Component', () => {
  let component: Mql4Mql5Component;
  let fixture: ComponentFixture<Mql4Mql5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mql4Mql5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mql4Mql5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
