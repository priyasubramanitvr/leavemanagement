import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { LeaveService } from 'src/app/leave/leave.service';
import { Leave } from 'src/app/leave/leave.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  
    templateUrl: './empviewleave.component.html',
    styleUrls: ['./empviewleave.component.css']
  })
  export class EmpViewLeaveComponent implements OnInit{
userId:string;
//private leave;
    public leaves:Leave[] = [];
    
    //private leaveSub: Subscription;
    constructor(private leaveService: LeaveService, private router:Router,private authService:AuthService,
    
      private http:HttpClient) { }

    ngOnInit(){
      
 
     // console.log('dmaic:'+JSON.stringify(this.leave));
    //  this.leave.userId = this.authService.getLoginUser().email;
      this.leaveService.getDetails()
  // this.leaveSub = this.leaveService.getDetails()
      
      .subscribe((leaves: Leave[]) => {
        
        this.leaves = leaves;
        console.log("emplist::"+JSON.stringify(this.leaves));
      });
    
    
    }
    
    
    
    
    
    
    
    }
  