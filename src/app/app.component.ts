import { Component } from '@angular/core';
import { MinValidator } from '@angular/forms';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';



@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  imgParent = '';
 // token = '';
 imgRta = '';
 



  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private filesService: FilesService,
  ) {}

  onLoaded(img: string) {
    console.log('log desde el padre', img);
  }

  createUser() {
    this.userService.create({
      name: 'jairo',
      email: 'jairo@mail.com',
      password: '1212',
      role: 'customer',
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
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

  downloadPdf() {
    this.filesService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe()
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);

    if(file){
      this.filesService.uploadFile(file)
      .subscribe(rta => {
        this.imgRta = rta.location;
      });
    }
  }

}
