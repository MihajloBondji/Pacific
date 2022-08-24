import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderBlankComponent } from './header-blank/header-blank.component';
import { HeaderHomeComponent } from './header-home/header-home.component';
import { HomeComponent } from './home/home.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { UrediKorisnikeComponent } from './uredi-korisnike/uredi-korisnike.component';
import { DodajKorisnikaComponent } from './dodaj-korisnika/dodaj-korisnika.component';
import { DodajKnjiguComponent } from './dodaj-knjigu/dodaj-knjigu.component';
import { UrediKnjigeComponent } from './uredi-knjige/uredi-knjige.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { PocetnaAdminComponent } from './pocetna-admin/pocetna-admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderUserComponent } from './header-user/header-user.component';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeMainComponent } from './home-main/home-main.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { UserMainComponent } from './user-main/user-main.component';
import { BookPageComponent } from './book-page/book-page.component';
import { BorrowedBooksComponent } from './borrowed-books/borrowed-books.component';
import { BorrowHistoryComponent } from './borrow-history/borrow-history.component';
import { BookRequestComponent } from './book-request/book-request.component';
import { BookRequestsComponent } from './book-requests/book-requests.component';
import { UrediKorisnikaComponent } from './uredi-korisnika/uredi-korisnika.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    RegisterComponent,
    HeaderBlankComponent,
    HeaderHomeComponent,
    HomeComponent,
    AdministratorComponent,
    LoginAdminComponent,
    UrediKorisnikeComponent,
    DodajKorisnikaComponent,
    DodajKnjiguComponent,
    UrediKnjigeComponent,
    HeaderAdminComponent,
    PocetnaAdminComponent,
    HeaderUserComponent,
    UserComponent,
    UserProfileComponent,
    HomeMainComponent,
    PretragaComponent,
    UserMainComponent,
    BookPageComponent,
    BorrowedBooksComponent,
    BorrowHistoryComponent,
    BookRequestComponent,
    BookRequestsComponent,
    UrediKorisnikaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
