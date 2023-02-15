import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  form!: FormGroup;

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(10)]],
      email: [''],
      phone: ['', Validators.required],
      color: [''],
      date: [''],
      category: [''],
      tag: [''],
      agree: [false],
    });
  }

  


  /* nameField = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  emailField = new FormControl('');
  phoneField = new FormControl('');
  colorField = new FormControl('');
  dateField = new FormControl('');

  categoryField = new FormControl('');
  tagField = new FormControl('');

  agreeField = new FormControl('false'); */

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
    // this.nameField.valueChanges
    // .subscribe(value => {
    //   console.log(value);
    // })
    /* this.form.valueChanges
    .subscribe(value => {
      console.log(value);
    }) */
  }

  save() {
    if(this.form.valid) {
      console.log(this.form.value);
    
    } else {
      this.form.markAllAsTouched();
    }
    
  }

  /* get isNameFieldValid() {
    return this.nameField.touched && this.nameField.valid;
  }

  get isNameFieldInvalid() {
    return this.nameField.touched && this.nameField.invalid;
  } */

  get isNamedValid() {
    return this.form.get('name')?.touched && this.form.get('name')?.valid;
  }

  get isNameInvalid() {
    return this.form.get('name')?.touched && this.form.get('name')?.invalid;;
  }

  get nameForm () {
    return this.form.get('name');
  } 

  get emailForm () {
    return this.form.get('email');
  } 

  get phoneForm () {
    return this.form.get('phone');
  } 

  get colorForm () {
    return this.form.get('color');
  } 

  get dateForm () {
    return this.form.get('date');
  } 

  get categoryForm () {
    return this.form.get('category');
  } 

  get tagForm () {
    return this.form.get('tag');
  } 

  get agreeForm () {
    return this.form.get('agree');
  } 

}
