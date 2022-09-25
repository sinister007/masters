import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Url } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  objResponse={}
isAuthenticated=false
  constructor(private router:Router,
    private http:HttpClient) { }
  authenticate(response:any){
this.objResponse=response
    console.log(response);
    if(response.message==="User Login Successful"){
      console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
      this.isAuthenticated=true
      return true
      
    }
    this.isAuthenticated=false
    return false
  }
 localSor

  logOut(){
    console.log(this.objResponse['data']['user']['accessToken']);
    this.router.navigate([''])
    
    
    this.http.post<any>("https://hiring-stackroots-server.herokuapp.com/auth/signout/user",this.objResponse)
    .pipe(
 
     )
     .subscribe((objResponse) => {
       console.log(objResponse);
       if(objResponse.message==="User Login Successful"){
        //  this.auth.authenticate(objResponse)
        this.router.navigate(['/home'])
   

       }
       
     })
    
  }
   
}
