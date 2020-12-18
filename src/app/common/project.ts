import {Profile} from './Profile';

export class Project {

  id:number;
  name:string;
  skills:string;
  startedDate: Date;
  dateComplete: Date;
  description: string;
  ghLink :string;
  demoLink:string;
  imageUrl: string;


  user:Profile;
}
