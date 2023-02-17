import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-categoryform',
  templateUrl: './categoryform.component.html',
  styleUrls: ['./categoryform.component.scss']
})
export class CategoryformComponent implements OnInit {

  form!: FormGroup

  constructor(
    private formBuilder: FormBuilder
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
      console.log(this.form.value);
    
    } else {
      this.form.markAllAsTouched();
    }
    
  }

  get nameForm() {
    return this.form.get('name')!;
  }

  get imageForm() {
    return this.form.get('image')!;
  }

}
