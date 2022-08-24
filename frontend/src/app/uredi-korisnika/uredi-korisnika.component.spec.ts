import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrediKorisnikaComponent } from './uredi-korisnika.component';

describe('UrediKorisnikaComponent', () => {
  let component: UrediKorisnikaComponent;
  let fixture: ComponentFixture<UrediKorisnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrediKorisnikaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrediKorisnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
