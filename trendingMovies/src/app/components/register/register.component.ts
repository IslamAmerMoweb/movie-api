import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/core/services/api-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  value = '';
  val = '';
  registerForm!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _Api: ApiServiceService,
    private _Router: Router
  ) {
    if (this._Api.userData.getValue()) {
      this._Router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this._fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.pattern(/^\w+\.?\w+\@\w+(\.com)$/)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        ],
      ],
      rePassword: [
        '',
        [Validators.required, Validators.pattern(this.confirmPassword())],
      ],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    });
  }

  confirmPassword(): string {
    if (this.val === this.value) {
      return this.value;
    } else {
      return '';
    }
  }

  register(): void {
    this._Api.signUP(this.registerForm.value).subscribe((res) => {
      if (res.message == 'success') {
        this._Router.navigate(['/login']);
      }
    });
  }

  errors(name: string, err: string): boolean {
    if (this.registerForm.get(name)?.hasError(err)) {
      return true;
    } else {
      return false;
    }
  }
}
