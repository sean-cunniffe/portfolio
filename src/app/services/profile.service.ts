import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Profile} from '../common/Profile';
import {EnvironmentService} from './environment.service';
import {ProfileSubject} from '../helpers/profile-subject';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl: string = '';
  profile: ProfileSubject = new ProfileSubject();

  constructor(private http: HttpClient, private environment: EnvironmentService) {
    this.baseUrl = this.environment.baseUrl;
    this.getUser(1);
  }

  private getUser(id: number) {
    this.http.get<Profile>(this.baseUrl + 'users?id=' + id).subscribe(response=>{
      console.log(response);
      this.profile.next(response);
      this.profile.profile = response;
    });
  }

  saveProfile(profile: Profile) {
    this.http.post(this.baseUrl + 'users', profile).subscribe(response => {
        console.log(response);
      }
    );
  }

  deleteProjects(deleteList: number[]) {
    for (let projectId of deleteList) {
      this.http.delete(this.baseUrl + 'project?id=' + projectId).subscribe(response => {
        console.log(response);
      });
    }
  }
}
