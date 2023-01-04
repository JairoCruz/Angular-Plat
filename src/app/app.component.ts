import { Component } from '@angular/core';
import { MinValidator } from '@angular/forms';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  imgParent = '';
 // token = '';
 



  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  onLoaded(img: string) {
    console.log('log desde el padre', img);
  }

  createUser() {
    this.userService.create({
      name: 'jairo',
      email: 'jairo@mail.com',
      password: '1212'
    })
    .subscribe(rta => {
      console.log(rta);
    });
  }


  // La funcionabilidad de este metodo y getProfile ahora esta en el nav.component.ts y nav.component.html
  // por lo cual eliminare de app.component.html los respectivos botones de login() y getProfile()
  login() {
    // this.authService.login('jairo@mail.com','1212')
    // .subscribe(rta => {
    //   console.log(rta.access_token);
    //   this.token = rta.access_token;
    // });
  }

  getProfile() {
    // this.authService.profile(this.token)
    // .subscribe(profile => {
    //   console.log(profile);
    // });
  }

}
