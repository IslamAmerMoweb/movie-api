import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/core/services/api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  msgError: string = '';
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
    this.loginForm = this._fb.group({
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
    });
  }

  login() {
    this._Api.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res.message == 'success') {
          console.log('proplem');
          localStorage.setItem('name', res.user.name);
          localStorage.setItem('token', res.token);
          this._Router.navigate(['/home']);
          this._Api.behavior();
        } else {
        }
      },
      error: (e) => {
        console.log(e);
        this.msgError = 'Incorrect email or password';
      },
    });
  }

  errors(name: string, err: string): boolean {
    if (this.loginForm.get(name)?.hasError(err)) {
      return true;
    } else {
      return false;
    }
  }
}
