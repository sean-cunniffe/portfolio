import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Profile} from '../common/Profile';
import {Observable, Subject} from 'rxjs';
import {EnvironmentService} from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl: string = '';
  profile: Subject<Profile> = new Subject<Profile>();

  constructor(private http: HttpClient, private environment: EnvironmentService) {
    this.baseUrl = this.environment.baseUrl;
    this.getUser(1);
  }

  private getUser(id: number) {
    this.http.get<Profile>(this.baseUrl + 'users?id=' + id).subscribe(response=>{
      this.profile.next(response);
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
