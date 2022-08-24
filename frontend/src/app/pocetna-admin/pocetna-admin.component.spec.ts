import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocetnaAdminComponent } from './pocetna-admin.component';

describe('PocetnaAdminComponent', () => {
  let component: PocetnaAdminComponent;
  let fixture: ComponentFixture<PocetnaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PocetnaAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PocetnaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
