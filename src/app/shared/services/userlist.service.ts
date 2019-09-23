import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Subject,Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../model/user.model';


@Injectable({ 
  providedIn: 'root'
})


export class UserlistService {
 
  //public users: Array<User> = [];
  public users: any;
  constructor(private http: HttpClient,private router: Router) {}
    
//getUsers():Observable<User[]> {
  //return this.http.get<User[]>('http://localhost:3000/api/user')
//}

getUsers() {
  return this.http.get('http://localhost:3000/api/user');
}

getUser(id: string) {
  return this.http.get<{ _id: string; firstName: string; lastName: string; email:string;phoneNumber:number}>(
    "http://localhost:3000/api/user" + id
  );
}

setResult(res: any){
  this.users = res;
}

}



    
  
  



