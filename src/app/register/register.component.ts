import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // uname="";
  // acno="";
  // pswd=""
  

 constructor(private fb:FormBuilder,private ds:DataService,private router:Router) { }  //(ds is a register variable) (Dataservice is a service)
   
 //Registermodel(used as a formModule) --- It mainly needs group , array , control

 registerForm=this.fb.group({  //group
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z.]*')]], //array   * -INCLUDE COMBO LIKE ab ba bb.
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]], 
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]], 
 })
 // control -- goes to register.component.html;
  ngOnInit(): void {
  }
  register(){
    // alert("Register successfull")
      // console.log(this.registerForm);
 
  var uname=this.registerForm.value.uname  // var uname=this.uname; 
  var acno=this.registerForm.value.acno   // var acno=this.acno;
  var pswd=this.registerForm.value.pswd   // var pswd=this.pswd;
  
  
  if(this.registerForm.valid){
    const result=this.ds.register(uname,acno,pswd)
    .subscribe((result:any)=>{             //asynchronous request 
     alert(result.message);   //register successfully
     this.router.navigateByUrl('') 
    },
    result=>{
      alert(result.error.message); //user already registered
      this.router.navigateByUrl('register')
    }
    )
  // if(result){
  //   alert("Register success");
  // }
  //   else{
  //   alert("Register failed")
  // }
  }
  // else{
  //   alert("Form is Incomplete")
  //   console.log(this.registerForm.get('uname')?.errors); // anyone can done 'uname','acno','pswd'
  // }
 }
}

 