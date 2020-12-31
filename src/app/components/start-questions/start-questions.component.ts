import {Component, OnInit} from '@angular/core';
import {Question} from '../../common/question';
import {QuestionOption} from '../../common/question-option';
import {QuestionsService} from '../../services/questions.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-start-questions',
  templateUrl: './start-questions.component.html',
  styleUrls: ['./start-questions.component.css']
})
export class StartQuestionsComponent implements OnInit {

  startQuestions: boolean = false;

  questions: Question[] = [];

  currentQuestion: Question = new Question('', []);
  questionIndex = 0;
  finished: boolean = false;

  constructor(private questionService: QuestionsService, private router: Router) {
  }

  ngOnInit(): void {
    this.questions.push(new Question('How did you find my web portfolio?'
      , [new QuestionOption('Linkedin', false),
        new QuestionOption('Directly from me (Sean Cunniffe)', false),
        new QuestionOption('Github', false),
        new QuestionOption('CV', false),
        new QuestionOption('Other', true)]));
    this.questions.push(new Question('What is your current occupation?'
      , [new QuestionOption('Work at a recruitment agency', false),
        new QuestionOption('Recruiting for a single company', false),
        new QuestionOption('A student', false),
        new QuestionOption('Other', true)]));
    let option = new QuestionOption('', true);
    let q = new Question('What company/college are you associated with?'
      , [option]);
    q.answer = option;
    this.questions.push(q);
    this.currentQuestion = this.questions[0];
  }


  nextQuestion() {
    if (this.questionIndex >= this.questions.length - 1) {
      this.finishQuestions();
    } else {
      let el = document.getElementById('question-container');
      el.style.animation = 'none';
      //timeout to trigger css animation
      setTimeout(() => {
        this.questionIndex++;
        this.currentQuestion = this.questions[this.questionIndex];
        el.style.animation = '';
      }, 1);
    }
  }

  previousQuestion() {
    this.questionIndex--;
    this.currentQuestion = this.questions[this.questionIndex];
  }

  skipQuestions() {
    this.router.navigate(['']);
  }

  private finishQuestions() {
    this.finished = true;
    this.questionService.sendQuestionAnswers(this.questions);
    setTimeout(() => {
      this.router.navigate(['']);
    }, 2000);

  }
}
