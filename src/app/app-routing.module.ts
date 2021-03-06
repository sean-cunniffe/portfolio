import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './components/admin/admin.component';
import {PortfolioComponent} from './components/portfolio/portfolio.component';
import {LoginComponent} from './components/login/login.component';
import {StartQuestionsComponent} from './components/start-questions/start-questions.component';

const routes: Routes = [
  {path: 'admin',component: AdminComponent},
  {path: 'login',component:LoginComponent},
  {path: 'quick-questions',component:StartQuestionsComponent},
  {path: '**',redirectTo:'', component:PortfolioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
