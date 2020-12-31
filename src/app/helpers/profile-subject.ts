import {Subject, Subscription} from 'rxjs';
import {Profile} from '../common/Profile';

export class ProfileSubject extends Subject<Profile> {

  profile: Profile = undefined;

  // @ts-ignore
  subscribe(next?: (value: any) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    if (this.profile != undefined) {
      setTimeout(()=>{
        this.next(this.profile);
      },10);
    }
    return super.subscribe(next,error,complete);
  }
}
