import {QuestionOption} from './question-option';

export class Question {


  constructor(public question: string,
              public options: QuestionOption[]) {
  }

  answer: QuestionOption = undefined;

  getAnswer(): string {
    if(this.answer == undefined){
      return undefined;
    }
    //check if a answer was selected

    //check if the answer is a textfield answer, if so, return the value if it isnt empty
    if (this.answer.textField) {
      if (this.answer.textFieldAnswer.trim() !== '') {
        return this.answer.textFieldAnswer;
      }else{
        return undefined;
      }
    } else {
      return this.answer.option;
    }
  }

  setSelected(option: QuestionOption) {
    if (this.answer == option) {
      this.answer = undefined;
    } else {
      this.answer = option;
    }

  }
}
