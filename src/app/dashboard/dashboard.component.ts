import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
      //Deposit properties and withdraw properties
     acno="";
     pswd="";
     amount="";
      
      //login username
      user="";

      // deposit- app delete in dashboard.
      // acno2="";
        
      //date and time properties.
      SystemDate:any;

      //deposit model

      depositform=this.fb.group({  //group
        acno:['',[Validators.required,Validators.pattern('[a-zA-Z.]*')]], //array   * -INCLUDE COMBO LIKE ab ba bb.
        pswd:['',[Validators.required,Validators.pattern('[0-9]*')]], 
        amount:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]], 
     })

     //withdraw model
         
     withdrawform=this.fb.group({  //group
      acno:['',[Validators.required,Validators.pattern('[a-zA-Z.]*')]], //array   * -INCLUDE COMBO LIKE ab ba bb.
      pswd:['',[Validators.required,Validators.pattern('[0-9]*')]], 
      amount:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]], 
   })
     

    constructor(private ds:DataService,private router:Router,private fb:FormBuilder) {
      if(localStorage.getItem('currentAcno')){
      this.user=JSON.parse(localStorage.getItem('currentUser')||'') 
      }
    // this.user=this.ds.currentUser;
    this.SystemDate=new Date();
    }
    
   ngOnInit(): void {
  //   if(!localStorage.getItem('currentAcno')){  //! is defines as not
  //   alert("please login");
  //   this.router.navigateByUrl('');
  //  }
 }

deposit(){
 var acno=this.depositform.value.acno;
 var pswd=this.depositform.value.pswd;
 var amount=this.depositform.value.amount;
   if(this.depositform.valid){
   this.ds.deposit(acno,pswd,amount)
   .subscribe((result:any)=>{
   alert(result.message);
  },
   result=>{
   alert(result.error.message)
})
}
else{
 alert('Invalid form')
}
}

withdraw(){
  var acno=this.depositform.value.acno;
  var pswd=this.depositform.value.pswd;
  var amount=this.depositform.value.amount;
  if(this.depositform.valid){
      this.ds.withdraw(acno,pswd,amount)
      .subscribe((result:any) =>{
       alert(result.message);
  },
       result =>{
       alert(result.error.message)
  })
}
else{
  alert('Invalid form')
 }
 }

// logout button
logout(){
  // remove login name 
  localStorage.removeItem('currentAcno');
  localStorage.removeItem('currentUser')
  localStorage.removeItem('token')
   //Then navigate to login page
   this.router.navigateByUrl('');
}
// delete button
delete(){
    this.acno=JSON.parse(localStorage.getItem('currentAcno')||'');
}
oncancel(){
  this.acno="";
}
onDelete(event:any){  //$ is used asevent binding
  // alert(event)
  this.ds.deleteAcc(event)
  .subscribe((result:any) =>{
    alert(result.message);
    // this.router.navigateByUrl('')   Or
    this.logout()  // it will clear all
  },
  result =>{
    alert(result.error.message)
  })
}
}
