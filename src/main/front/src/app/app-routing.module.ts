import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { DetailPageComponent } from './components/detail-page/detail-page.component';
const routes: Routes = [
  { path: '', component:  MainPageComponent }, 
  { path: 'detail/:id', component: DetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
