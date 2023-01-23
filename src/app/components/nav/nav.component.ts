import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from '../../services/category.service'
import { User } from 'src/app/models/user.model';
import { Category } from 'src/app/models/category.model';


import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    // aca nos suscribimos para escuchar lo que tiene myShoppingCart
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });

    this.getAllCategories();
  }

  toogleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login(){
    this.authService.loginAndGet('jairo@mail.com','1212')
    .subscribe(user => {
      this.profile = user;
    });
  }

  getAllCategories() {
    this.categoryService.getAll()
    .subscribe(data => {
      this.categories = data;
    });
  }

}
