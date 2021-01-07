import { Component, OnInit } from '@angular/core';
import {Profile} from '../../common/Profile';
import {ProfileService} from '../../services/profile.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  profile :Profile = new Profile();
  email:string = '';
  linkedin:string = '';
  phone:string = '';

  cloudLocationX:Map<number,number> = new Map<number,number>();
  cloudLocationY:Map<number,number> = new Map<number,number>();

  constructor(private profileService:ProfileService) { }

  ngOnInit(): void {
    this.profileService.profile.subscribe(response =>{
      this.profile = response;
      for(let contact of this.profile.contacts){
        switch(contact.type){

          case 'CONTACTTYPE_PHONE': this.phone = contact.contactInfo;break;
          case 'CONTACTTYPE_LINKEDIN': this.linkedin = contact.contactInfo;break;
          case 'CONTACTTYPE_EMAIL': this.email = contact.contactInfo;break;
        }
      }
    })

  }

  randomXNumber(number: number):number {
    let num = this.cloudLocationX.get(number);
    return ContactComponent.getRandomNumber(number,num,this.cloudLocationX)
  }
  randomYNumber(number: number):number {
    let num = this.cloudLocationY.get(number);
    return ContactComponent.getRandomNumber(number,num,this.cloudLocationY)
  }

  private static getRandomNumber(key:number, value :number, map: Map<number,number>):number{
    if(value !== undefined){
      return value;
    }else{
      let num2 = Math.floor(Math.random()*100);
      map.set(key,num2);
      return num2;
    }
  }

}
