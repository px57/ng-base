
---- [USAGE]
    this.switchModalService.set_config_list([
      {
        name: 'signup',
        component: SignupComponent,
        backgroundClassName: 'modal-background',
        containerClassName: 'modal-container',
      },
      {
        name: 'login',
        component: SigninComponent,
        backgroundClassName: 'modal-background',
        containerClassName: 'modal-container',
      },
      {
        name: 'forget_password',
        component: ForgetPasswordComponent,
        backgroundClassName: 'modal-background',
        containerClassName: 'modal-container',
      }
    ]);

---- Communication des donnee au sein du component integrer d'une modal ----
- Deja il faut eviter d'avoir la fausse bonne idee d'injecter des donnees dans le component integrer d'une modal