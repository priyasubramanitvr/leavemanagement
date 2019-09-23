export interface Leave {
     
     _id:string
     userId:string
     
    employeeName:string,
    employeeEmail:string
    department:string,
    leaveFromDate:Date,
    leaveToDate:Date,
    reasonForLeave:string,
    leaveDays: number,
    description:string,
    leaveStatus:String
  
  }