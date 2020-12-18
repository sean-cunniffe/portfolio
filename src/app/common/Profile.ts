import {Project} from './project';
import {Contact} from './Contact';

export class Profile {

  id:number;
  name:string;
  dob:Date;
  graduationYear:string;
  /**
   * /br/ separator to get multiple paragraphs from this string
   */
  address: string;
  imageUrl:string = '';
  cv:string;
  aboutParagraph:string; // before /br/ separation
  projects:Project[];
  contacts:Contact[];

  aboutParagraphs:string[]; // after /br/ separation

}
