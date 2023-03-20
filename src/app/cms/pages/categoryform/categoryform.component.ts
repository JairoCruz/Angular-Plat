import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CategoryService } from 'src/app/services/category.service';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-categoryform',
  templateUrl: './categoryform.component.html',
  styleUrls: ['./categoryform.component.scss']
})
export class CategoryformComponent implements OnInit {

  form!: FormGroup
  categoryId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
    ) { 
      this.buildForm();
    }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.categoryId = params['id'];
      console.log('llego aca');
      if (this.categoryId) {
        this.getCategory();
      }
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required],/* MyValidators.validCategory(this.categoryService)*/],
      image:['', [Validators.required]],
    });
  }

  save() {
    if(this.form.valid) {
      if (this.categoryId) {
        this.updateCategory();
      } else {
        // console.log(this.form.value);
        this.createCategory();
      }
    } else {
      this.form.markAllAsTouched();
    }
    
  }

  private getCategory() {
    this.categoryService.getCategory(this.categoryId)
    .subscribe(data => {
      this.form.patchValue(data);
    });
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

  private updateCategory() {
    const data = this.form.value;
    this.categoryService.updateCategory(this.categoryId,data)
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
