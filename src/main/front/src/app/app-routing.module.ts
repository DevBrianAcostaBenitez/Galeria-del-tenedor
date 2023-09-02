import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { DetailPageComponent } from './components/detail-page/detail-page.component';
import { AdminTableComponent } from './components/admin-table/admin-table.component';
import { AddMealComponent } from './components/add-meal/add-meal.component';
import { EditMealComponent } from './components/edit-meal/edit-meal.component';
const routes: Routes = [
  { path: '', component:  MainPageComponent }, 
  { path: 'detail/:id', component: DetailPageComponent },
  { path: 'admin-detail/:id', component: DetailPageComponent, data: { fromRoute: 'admin' } },
  { path: 'admin', component: AdminTableComponent },
  { path: 'admin/addMeal', component: AddMealComponent  },
  { path: 'admin/editMeal/:id', component: EditMealComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
