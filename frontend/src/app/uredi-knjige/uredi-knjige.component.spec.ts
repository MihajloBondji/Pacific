import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrediKnjigeComponent } from './uredi-knjige.component';

describe('UrediKnjigeComponent', () => {
  let component: UrediKnjigeComponent;
  let fixture: ComponentFixture<UrediKnjigeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrediKnjigeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrediKnjigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
