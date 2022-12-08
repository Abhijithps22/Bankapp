import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {DataService} from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  //1. properties
  aim="Your perfect banking partner";

  accounts="Enter your acno here";

  // acno="";//1000
  // pswd="";//1000

  //2.user defined function(4th execute)
  
// userDetails:any={//objects of objects
//   1000: {acno:1000,username:'Abi',password:1000,balance:2000}, //key:value
//   1001: {acno:1001,username:'Abijith',password:1001,balance:2000},
// }

      //  loginform 
  loginform=this.fb.group({
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]], 
  pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]], 
  })

   //router- variable of login.    //Router-its a class of navigateByUrl
  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { } // (1st execute)spl member function,automatically involks an obj created.
  
  ngOnInit(): void { //(2nd execute) life cycle hooks of angular.
  }

// acnochange(event:any){
// this.acno=event.target.value;//1000
// console.log(this.acno);

// }
// pswdchange(event:any){
// this.pswd=event.target.value;//1000
// console.log(this.pswd);
// }

login(){
  //alert('login successfull)
  var acno=this.loginform.value.acno;
  var pswd=this.loginform.value.pswd;

  if(this.loginform.valid){
  const result=this.ds.login(acno,pswd)
  .subscribe((result:any) =>{
    localStorage.setItem('currentUser',JSON.stringify(result.currentUser))  //Welcome username
    localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
    localStorage.setItem('token',JSON.stringify(result.token))
    alert(result.message)
   this.router.navigateByUrl('dashboard')
  },
      result =>{
      alert(result.error.message)
      this.router.navigateByUrl('')
    }
  )
  
  // if(result){
  //     alert("login successfull");
  //     this.router.navigateByUrl('dashboard');  //the router is used as a login class name
  // }
  //   else{
  //     alert("Invalid password")
  //   }
  // }else{
  //     alert("Invalid User Details")
  //   }
  }
// else{
//   alert("Form is Incomplete")
//     console.log(this.loginform.get('acno')?.errors); //'acno' is neccessary
//   }
}

                // OR

  //  login(a:any,b:any){
  //  //alert('login successfull)
  //  var acno=a.value;
  //  var pswd=b.value;
  //  var userDetails=this.userDetails;
  //   if(acno in userDetails){
  //      if(pswd==userDetails[acno]["password"]){
  //         alert("Login successfull");
  //             }
  //              else{
  //         alert("Invalid password")
  //             }
  //            }else{
  //        alert("Invalid User Details")
  //                 }
  //           }
}