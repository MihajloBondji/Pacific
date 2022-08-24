import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajKorisnikaComponent } from './dodaj-korisnika.component';

describe('DodajKorisnikaComponent', () => {
  let component: DodajKorisnikaComponent;
  let fixture: ComponentFixture<DodajKorisnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajKorisnikaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodajKorisnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
