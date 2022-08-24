import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './administrator/administrator.component';
import { BookPageComponent } from './book-page/book-page.component';
import { BookRequestComponent } from './book-request/book-request.component';
import { BookRequestsComponent } from './book-requests/book-requests.component';
import { BorrowHistoryComponent } from './borrow-history/borrow-history.component';
import { BorrowedBooksComponent } from './borrowed-books/borrowed-books.component';
import { DodajKnjiguComponent } from './dodaj-knjigu/dodaj-knjigu.component';
import { DodajKorisnikaComponent } from './dodaj-korisnika/dodaj-korisnika.component';
import { HomeMainComponent } from './home-main/home-main.component';
import { HomeComponent } from './home/home.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginComponent } from './login/login.component';
import { PocetnaAdminComponent } from './pocetna-admin/pocetna-admin.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { RegisterComponent } from './register/register.component';
import { UrediKnjigeComponent } from './uredi-knjige/uredi-knjige.component';
import { UrediKorisnikaComponent } from './uredi-korisnika/uredi-korisnika.component';
import { UrediKorisnikeComponent } from './uredi-korisnike/uredi-korisnike.component';
import { UserMainComponent } from './user-main/user-main.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', component: HomeComponent,children:[
    {
      path:'pretraga',
      component:PretragaComponent
    },
    {
      path:'home-main',
      component:HomeMainComponent
    }]
  },
  {path: 'user', component: UserComponent,children:[
    {
      path:'user-profile',
      component:UserProfileComponent
    },
    {
      path:'user-main',
      component:UserMainComponent
    },
    {
      path:'pretraga',
      component:PretragaComponent
    },
    {
      path:'borrowed-books',
      component:BorrowedBooksComponent
    },
    {
      path:'borrow-history',
      component:BorrowHistoryComponent
    },
    {
      path:'book-request',
      component:BookRequestComponent
    },
    {
      path:'book-requests',
      component:BookRequestsComponent
    },
    {
      path:'dodaj-knjigu',
      component:DodajKnjiguComponent
    },
    {
      path:'book-page/:id',
      component:BookPageComponent
    }]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'administrator', component: AdministratorComponent, children:[
    {
      path:'uredi-korisnike',
      component:UrediKorisnikeComponent
    },
    {
      path:'uredi-korisnika',
      component:UrediKorisnikaComponent
    },
    {
      path:'uredi-knjige',
      component:UrediKnjigeComponent
    },
    {
      path:'dodaj-korisnika',
      component:DodajKorisnikaComponent
    },
    {
      path:'dodaj-knjigu',
      component:DodajKnjiguComponent
    },
    {
      path:'pocetna-admin',
      component:PocetnaAdminComponent
    },
    {
      path:'book-page/:id',
      component:BookPageComponent
    }]
  },
  {path: 'login-admin', component: LoginAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
