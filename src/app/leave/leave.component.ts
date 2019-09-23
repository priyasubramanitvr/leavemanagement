import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LeaveService } from './leave.service';
import { Leave } from './leave.model';
import { AuthService } from '../shared/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { UserlistService } from '../shared/services/userlist.service';


@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent  implements OnInit{
 
  private leave:Leave
  
  leaveBalance:boolean=false;
applyLeave:boolean=true;
leaveFromDate=Date();
leaveToDate=Date();
days:any;
todateSec:any;
fromdateSec:any;
millisecondsPerDay:any;
diff:any;
weeks:any;
leaveDays='';
  

  create_leave_req_msg: string;
  submitted = true;
  public has_error = false;
  public users: any;
    
    
  constructor(private leaveservice:LeaveService,private authService:AuthService,private userlistService: UserlistService, private http:HttpClient){

  }

  leaveForm = new FormGroup({
    employeeName: new FormControl(),
    employeeEmail: new FormControl(),
    department:new FormControl(null,Validators.required),
  
    leaveFromDate:new FormControl(null,Validators.required),
    leaveToDate:new FormControl(null,Validators.required),
    reasonForLeave:new FormControl(null,Validators.required),
    leaveDays:new FormControl(),
    description: new FormControl(null,Validators.required),
    



  });
   ngOnInit(){
    
    
      this.userlistService.getUsers()
      .subscribe(res => {
        this.users = res;
        this.userlistService.setResult(this.users);
        console.log(JSON.stringify(res));
      });
     
    }

   

   onSubmit() {
     
      this.submitted = true;
         console.log('empleave:'+JSON.stringify(this.leaveForm.value));
        
         this.leaveservice.save(this.leaveForm.value)
         .subscribe(data => {
           this.leave = data;
           console.log('empapply:'+JSON.stringify(data));
         this.create_leave_req_msg = 'Leave Request succesfully Submitted';
         this.leaveForm.reset();
         this.submitted = false;
       }, error => {
         
         this.has_error = true;
         this.create_leave_req_msg = error.error.message;
       });
      }
      fromJsonDate(e): string {
        const bDate: Date = new Date(e);
        return bDate.toISOString().substring(0, 10); 
      
      }
     // fromatDate(e) {
      //  const convertDate:Date  = new Date(e.target.value).toISOString();
      //  this.leaveForm.get('leaveFromDate').setValue(convertDate,{
        //  onlyself:true
       // })
     //   return convertDate.toISOString().substring(0, 10);  //Ignore time
     // }

       onClear() {
        this.leaveForm.reset();
       
     }
     onKeyUpfromdate(event: any) {
      this.leaveFromDate = event.target.value;
      console.log(this.leaveFromDate);
      this.todateSec = new Date(this.leaveToDate);
      this.fromdateSec = new Date(this.leaveFromDate);
       
      if (this.fromdateSec < this.todateSec)
      alert('To date must be grater that from date!');
       
       
       
      // Calculate days between dates
      this.millisecondsPerDay = 86400 * 1000; // Day in milliseconds
      this.fromdateSec.setHours(0,0,0,1); // Start just after midnight
      this.todateSec.setHours(23,59,59,999); // End just before midnight
      this.diff = this.todateSec - this.fromdateSec; // Milliseconds between datetime objects 
      this.days = Math.ceil(this.diff / this.millisecondsPerDay);
       
      // Subtract two weekend days for every week in between
      this.weeks = Math.floor(this.days / 7);
      this.days = this.days - (this.weeks * 2);
       
      // Handle special cases
      this.fromdateSec = this.fromdateSec.getDay();
      this.todateSec = this.todateSec.getDay();
       
      // Remove weekend not previously removed. 
      if (this.fromdateSec - this.todateSec > 1) 
      this.days = this.days - 2; 
       
      // Remove start day if span starts on Sunday but ends before Saturday
      if (this.fromdateSec == 0 && this.todateSec != 6)
      this.days = this.days - 1; 
       
      // Remove end day if span ends on Saturday but starts after Sunday
      if (this.todateSec == 6 && this.fromdateSec != 0){
      this.days = this.days - 1 ;
      }
      this.leaveDays = this.days;
      if(this.leaveDays =='NaN' || this.leaveDays =='' || this.leaveDays <='0' || this.leaveDays =='undefined'){
      this.leaveDays ='';
      }else{
      this.leaveDays = this.days;
      }
       
       
      }
       
      onKeyUptoDate(event: any) {
      this.leaveToDate = event.target.value;
      console.log(this.leaveToDate);
      //alert(this.toDate);
      //alert(this.fromDate);
       
      this.todateSec = new Date(this.leaveToDate);
      this.fromdateSec = new Date(this.leaveFromDate);
       
      if (this.todateSec < this.fromdateSec)
      alert('To date must be grater that from date!');
       
      // Calculate days between dates
      this.millisecondsPerDay = 86400 * 1000; // Day in milliseconds
      this.fromdateSec.setHours(0, 0, 0, 1); // Start just after midnight
      this.todateSec.setHours(23, 59, 59, 999); // End just before midnight
      this.diff = this.todateSec - this.fromdateSec; // Milliseconds between datetime objects 
      this.days = Math.ceil(this.diff / this.millisecondsPerDay);
       
      // Subtract two weekend days for every week in between
      this.weeks = Math.floor(this.days / 7);
      this.days = this.days - (this.weeks * 2);
       
      // Handle special cases
      this.fromdateSec = this.fromdateSec.getDay();
      this.todateSec = this.todateSec.getDay();
       
      // Remove weekend not previously removed. 
      if (this.fromdateSec - this.todateSec > 1) 
      this.days = this.days - 2; 
       
      // Remove start day if span starts on Sunday but ends before Saturday
      if (this.fromdateSec == 0 && this.todateSec != 6)
      this.days = this.days - 1; 
       
      // Remove end day if span ends on Saturday but starts after Sunday
      if (this.todateSec === 6 && this.fromdateSec !== 0) {
      this.days = this.days - 1 ;
      }
      this.leaveDays = this.days;
      if ( this.leaveDays === 'NaN' || this.leaveDays === '' || this.leaveDays <= '0' || this.leaveDays =='undefined'){
      this.leaveDays = '';
      } else {
      this.leaveDays = this.days;
      }
       
      }

}

 

