export class QuestionOption {


  isSelected = false;
  textFieldAnswer: string = '';

  constructor(public option: string, public textField: boolean) {
  }

}
