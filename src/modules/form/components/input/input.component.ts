import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  /**
   * @description: 
   */
  @Input()
  public formGroup: FormGroup = new FormGroup({});

  /**
   * @description:
   */
  @Input()
  public formControlName: string = '';

  /**
   * @description:
   */
  @Input() 
  public type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'datetime-local' | 'time' | 'week' | 'month' | 'color' = 'password';

  /**
   * @description:
   */
  @Input()
  public placeholder: string = '';

  /**
   * @description:
   */
  @Input()
  public value: string = '';

  /**
   * @description:
   */
  @Input()
  public name: string = '';

  /**
   * @description:
   */
  @Input()
  public id: string = '';

  /**
   * @description:
   */
  @Input()
  public disabled: boolean = false;

  /**
   * @description:
   */
  @Input()
  public required: boolean = false;

  /**
   * @description:
   */
  @Input()
  public readonly: boolean = false;

  /**
   * @description:
   */
  @Input()
  public autofocus: boolean = false;

  /**
   * @description:
   */
  @Input()
  public autocomplete: 'on' | 'off' = 'on';

  /**
   * @description:
   */
  @Input()
  public pattern: string = '';

  /**
   * @description:
   */
  @Input()
  public minlength: number = 0;

  /**
   * @description:
   */
  @Input()
  public maxlength: number = 0;

  /**
   * @description:
   */
  @Input()
  public min: number = 0;

  /**
   * @description:
   */
  @Input()
  public max: number = 0;

  /**
   * @description: Variable to show or hide the password 
   */
  @Input()
  public showPassword: boolean = false;

  /**
   * @description:
   */
  @Input()
  public showPasswordStrength: boolean = false;

  /**
   * @description: 
   */
  public invariable_type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'datetime-local' | 'time' | 'week' | 'month' | 'color' = 'text';

  /**
   * @description: Percentage of the password strength
   */
  public password_strength: Array<boolean> = [false, false, false, false, false];

  /**
   * @description
   */
  public input_model: string = '';

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ password
  /**
   * @description: Hide or show the password
   */
  public togglePassword(): void {
    this.showPassword = !this.showPassword;
    this.type = this.showPassword ? 'text' : 'password';
  }

  /**
   * @description:
   */
  public passwordStrength(password: string): void {
    if (!this.showPasswordStrength) { return; }
    this.password_strength[0] = password.length >= 8; // Exemple : considérez que le mot de passe doit avoir au moins 8 caractères
    this.password_strength[1] = /[0-9]/.test(password); // Vérifie la présence de chiffres
    this.password_strength[2] = /[A-Z]/.test(password); // Vérifie la présence de lettres majuscules
    this.password_strength[3] = /[a-z]/.test(password); // Vérifie la présence de lettres minuscules
    this.password_strength[4] = /\W/.test(password); // Vérifie la présence de caractères spéciaux
  }

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ NgOnInit
  /**
   * @description:
   */
  public ngOnInit(): void {
    this.invariable_type = this.type;
  }
}
