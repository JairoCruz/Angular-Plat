import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categoryform',
  templateUrl: './categoryform.component.html',
  styleUrls: ['./categoryform.component.scss']
})
export class CategoryformComponent implements OnInit {

  form!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
    ) { 
      this.buildForm();
    }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      image:['', [Validators.required]],
    });
  }

  save() {
    if(this.form.valid) {
     // console.log(this.form.value);
      this.createCategory();
    } else {
      this.form.markAllAsTouched();
    }
    
  }

  private createCategory() {
    const data = this.form.value;
    this.categoryService.createCategory(data)
    .subscribe(rta => {
      console.log(rta);
      // En este lugar debia haber puesto el codigo
      // para subir una imagen con firebase, para que firebase me
      // brindara una url valida para poder mandar a la api.
      // Estoy pendiente de implementar esa funcionabilidad con firebase
      this.router.navigate(['./home']);
    });
  }

  get nameForm() {
    return this.form.get('name')!;
  }

  get imageForm() {
    return this.form.get('image')!;
  }

}
