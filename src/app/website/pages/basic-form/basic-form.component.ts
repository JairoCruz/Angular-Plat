import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  form!: FormGroup;

  private buildForm() {
    this.form = this.formBuilder.group({
      fullName: this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z]+$/)]],
        last: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z]+$/)]]
      }),
      email: ['',[Validators.required, Validators.email]],
      phone: ['', Validators.required],
      color: [''],
      date: [''],
      category: [''],
      tag: [''],
      agree: [false, [Validators.requiredTrue]],
      password: ['', [Validators.required, Validators.maxLength(10), MyValidators.validPassword]],
      confirmPassword: ['', [Validators.required]],
    }, {
      // Esto es validadores grupales
      validators: MyValidators.matchPasswords
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
    return this.form.get('fullName')?.get('name')?.touched && this.form.get('name')?.valid;
  }

  get isNameInvalid() {
    return this.form.get('fullName')?.get('name')?.touched && this.form.get('name')?.invalid;;
  }

  get isPasswordValid() {
    return this.form.get('password')?.touched && this.form.get('password')?.valid;
  }

  get isPasswordInvalid() {
    return this.form.get('password')?.touched && this.form.get('password')?.invalid;;
  }

  get isConfirmPasswordValid() {
    return this.form.get('confirmPassword')?.touched && this.form.get('confirmPassword')?.valid;
  }

  get isConfirmPasswordInvalid() {
    return this.form.get('confirmPassword')?.touched && this.form.get('confirmPassword')?.invalid;
  }

  get isLastValid() {
    return this.form.get('fullName')?.get('last')?.touched &&this.form.get('fullName')?.get('last')?.valid;
  }

  get isLastInvalid() {
    return this.form.get('fullName')?.get('last')?.touched && this.form.get('fullName')?.get('last')?.invalid;;
  }

  get nameForm () {
    return this.form.get('fullName')?.get('name');
  } 

  get lastForm() {
    return this.form.get('fullName')?.get('last');
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

  get passwordForm () {
    return this.form.get('password');
  }

  get confirmPasswordForm () {
    return this.form.get('confirmPassword');
  }

}
