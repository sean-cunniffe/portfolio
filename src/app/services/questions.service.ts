import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService} from './environment.service';
import {Question} from '../common/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private baseUrl: string;

  constructor(private http: HttpClient, private environment: EnvironmentService) {
    this.baseUrl = this.environment.baseUrl;
  }


  public sendQuestionAnswers(questions: Question[]) {
    //map to interface that's readable to server, dont add if answer is undefined
    let questionDTOs: QuestionDTO[] = questions.map(question => {
      let answer = question.getAnswer();
      if (answer !== undefined) {
        return <QuestionDTO> {
          question: question.question,
          answer: answer,
          date: new Date()
        };
      }
    });
    //filter out unanswered
    questionDTOs = questionDTOs.filter((question) => {
      return question !== undefined;
    });
    localStorage.setItem('questions-answered','questions-answered');
    this.http.post(this.baseUrl + 'questions/answers', questionDTOs)
      .subscribe((response) => console.log(response));
  }
}

interface QuestionDTO {
  question: string;
  answer: string;
}
