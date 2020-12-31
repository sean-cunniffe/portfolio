import {Component} from '@angular/core';
import {ProfileService} from './services/profile.service';
import {QuestionsService} from './services/questions.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sean Cunniffe Portfolio';

  constructor(profileService: ProfileService,questionService: QuestionsService, private router: Router) {
  }


  ngOnInit(): void {
    let answered:string = localStorage.getItem('questions-answered');
    if(answered == undefined){
      console.log('not answered, redirect');
      this.router.navigate(['quick-questions']);
    }else{
      console.log('answered');
    }
  }
}

