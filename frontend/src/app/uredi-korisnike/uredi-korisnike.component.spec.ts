import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrediKorisnikeComponent } from './uredi-korisnike.component';

describe('UrediKorisnikeComponent', () => {
  let component: UrediKorisnikeComponent;
  let fixture: ComponentFixture<UrediKorisnikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrediKorisnikeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrediKorisnikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
