import {FormControl, ValidationErrors} from '@angular/forms';

export class EditDetailsValidator {

  static beforeTodayDate(control:FormControl): ValidationErrors{
    let date:Date = new Date(control.value);
    let todayDate: Date = new Date();
    if(date.getTime()-todayDate.getTime() >=0){
      //date is after today date
      return {'beforeTodayDate': true};
    }else{
      return null;
    }
  }
}
