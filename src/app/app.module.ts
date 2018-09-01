import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FacebookModule } from 'ngx-facebook';

import { AppComponent } from './app.component';
import { InviteComponent } from './invite/invite.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: InviteComponent },
  { path: '404', component: NotFoundComponent },
  { path: ':code', component: InviteComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    InviteComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { enableTracing: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
