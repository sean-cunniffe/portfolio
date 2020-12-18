import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AboutComponent} from './components/about/about.component';
import {ProjectsComponent} from './components/projects/projects.component';
import {ContactComponent} from './components/contact/contact.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BasicAuthInterceptor} from './helpers/basic-auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    ContactComponent,
    AdminComponent,
    PortfolioComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HttpClientModule,FormsModule, {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
