import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userDetails: any={
  1000: {acno:1000,uname:'Abhijith',pswd:1000,balance:1000,transaction:[]}, //key:value  
  1001: {acno:1001,uname:'luka',pswd:1001,balance:1000,transaction:[]}
}

  //1.login change name
  currentUser:any;

  //login acno transaction
  currentAcno:any;

  constructor(private router:Router,private http:HttpClient) {  //getdetails in localstorage
    // this.getdetails();
  }


  // To get details from localstorage 
  // getdetails(){
  //   if(localStorage.getItem('database')){
  //     this.userDetails=JSON.parse(localStorage.getItem('database')||'');
  //   }
  //   if(localStorage.getItem('currentAcno')){
  //     this.currentAcno=JSON.parse(localStorage.getItem('currentAcno')||'');
  //   }
  //   if(localStorage.getItem('currentUser')){
  //     this.currentUser=JSON.parse(localStorage.getItem('currentUser')||'');
  //   }
  // }

  //Save details -- To save in localstorage
  savedetails(){
     if(this.userDetails){ 
     localStorage.setItem('database',JSON.stringify(this.userDetails));
    }
    if(this.currentAcno){ 
      localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno));
    }
     if(this.currentUser){ 
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
    }
}

  register(acno:any,uname:any,pswd:any){
       const data = {
        acno,
        uname,
        pswd       //object
       }
    // var userDetails=this.userDetails;
    // if(acno in localStorage){
    //   return false;
    // }
    // else{
    //   userDetails[acno]={
    //     acno,
    //     username,
    //     password,
    //     balance:0,
    //     transaction:[]
    //   }
    //   console.log(userDetails);
    //   this.savedetails();
    //   return true;
      
    // } 
    return this.http.post('http://localhost:3000/register',data)  //import data  post-register  return- data given
  }
              //  login
      login(acno:any,pswd:any){
      const data ={
        acno,
        pswd
      }
      return this.http.post('http://localhost:3000/login',data)

    // var userDetails=this.userDetails;
    // if(acno in userDetails){
    //   if(pswd==userDetails[acno]['password']){
    //     this.currentUser= userDetails[acno]['username']
    //     this.currentAcno=acno;   //transaction already having acno itself
    //     this.savedetails();
    //     return true;
    //   }
    //   else{
    //     return false;
    //   }
    // }
    // else{
    //     return false;
    // }
  }
                //get token
  getToken(){
    const token=JSON.parse(localStorage.getItem('token')||'');//get the token from local storage
     //generate token
     let headers = new HttpHeaders()
     //token append
     if(token){
      options.headers=headers.append('x-access-token',token)   //backend connect
     }
     return options
  }
               //deposit
  deposit(acno:any,pswd:any,amount:any){
      const data ={
        acno,
        pswd,
        amount
      }
      return this.http.post('http://localhost:3000/deposit',data,this.getToken())
    //  let userDetails=this.userDetails;
    //  var amount=parseInt(amt);
    //  if(acno in userDetails){
    //   if(pswd==userDetails[acno]['password']){
    //       userDetails[acno]['balance']+=amount;
    //       this.currentAcno=acno;
    //       userDetails[acno]['transaction'].push({
    //         type:'credit',  //TRANSACTION
    //         amount
    //       })
    //       console.log(userDetails);
    //       this.savedetails();
          
    //     return userDetails[acno]['balance'];
    //   }
    //   else{
    //     alert('invalid password')
    //     return false;
    //   }
    //  }
    //  else{
    //   alert('invalid userdetails')
    //   return false;
    //  }
  }
                // Withdraw
  withdraw(acno:any,pswd:any,amount:any){
    const data={
      acno,
      pswd,
      amount
    } 
   return this.http.post('http://localhost:3000/withdraw',data,this.getToken()) 
  }
                //Transaction
  getTransaction(acno:any){  //acno is parameter
   const data={
    acno
   }
   return this.http.post('http://localhost:3000/transaction',data,this.getToken())
  }

                //Delete
  deleteAcc(acno:any) {   //backend connect
  return this.http.delete('http://localhost:3000/deleteAcc/'+acno)  // +acno refers to varaible
     
}
}
