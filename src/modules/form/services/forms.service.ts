import { Injectable } from "@angular/core";

/**
 * @description: HELP THE USER TO UNDERSTAND THE ERROR MESSAGE. 
 */
const FORM_DJANGO_TRADUCTOR: any = {
  // email: {
  //   exists: $localize`This email address is already in use.`,
  //   invalid: $localize`The email address is invalid.`,
  //   required: $localize`This field is required.`,
  //   not_encountered: $localize`This email address is not registered.`,
  //   'Enter a valid email address.': $localize`The email address is invalid.`,
  // },
};

@Injectable({
  providedIn: "root",
})
export class FormsService {
  /**
   * @description: Constructeur.
   */
  constructor() {}

  /**
   * @description: Retourne le message d'erreur associé à un champ de formulaire.
   */
  public hasError(httpResponse: any, inputName: string | undefined): boolean {
    if (httpResponse === undefined) {
      return false;
    }

    if (inputName === undefined) {
      return false;
    }
    return (
      httpResponse.form_error !== undefined &&
      httpResponse.form_error[inputName] !== undefined
    );
  }

  /**
   * @description: Retourne le message d'erreur associé à un champ de formulaire.
   */
  public notHasError(
    httpResponse: any,
    inputName: string | undefined
  ): boolean {
    return !this.hasError(httpResponse, inputName);
  }

  /**
   * @description: Retourne le message d'erreur associé à un champ de formulaire.
   * @param httpResponse: any
   * @param inputName: string | undefined
   * @param traductor: any
   */
  public getErrorMsg(
    httpResponse: any,
    inputName: string | undefined
  ): string | undefined {
    if (this.notHasError(httpResponse, inputName)) {
      return undefined;
    }

    if (inputName === undefined) {
      return undefined;
    }

    const error = httpResponse.form_error[inputName][0];
    const errorMsg = this.getErrorMsgDjango(error, inputName);
    if (errorMsg === undefined) {
      console.error("FORM-ERROR>>>>", error);
    }
    return errorMsg;
  }

  /**
   * @description: Retourne le message d'erreur associé à un champ de formulaire.
   * @param httpResponse: any
   * @param inputName: string | undefined
   */
  private getErrorMsgDjango(
    error: string,
    inputName: string
  ): string | undefined {
    if (FORM_DJANGO_TRADUCTOR.hasOwnProperty(inputName) === false) {
      return undefined;
    }

    if (FORM_DJANGO_TRADUCTOR[inputName].hasOwnProperty(error) === false) {
      return undefined;
    }

    return FORM_DJANGO_TRADUCTOR[inputName][error];
  }

  /**
   * @description: Add the error message to the traductor.
   */
  public setConvertFormError(dict: any): void {
    for (const key of Object.keys(dict)) {
      console.log(key);
      if (FORM_DJANGO_TRADUCTOR.hasOwnProperty(key) === false) {
        FORM_DJANGO_TRADUCTOR[key] = dict[key];
      } else {
        Object.assign(FORM_DJANGO_TRADUCTOR[key], dict[key]);
      }
    }
  }
}
