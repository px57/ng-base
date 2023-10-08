import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './nav/home/home.component';
import { GlobalResolver } from 'src/resolvers/global-resolver';

const routes: Routes = [
  // -> [Route] - Home
  {
    path: '**', 
    component: HomeComponent,
    resolve: {
      G: GlobalResolver,
    }
  },
  // -> [Route] - Signin
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
