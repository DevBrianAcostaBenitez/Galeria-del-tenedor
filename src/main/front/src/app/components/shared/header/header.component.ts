import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MealFilterService } from '../../../services/Meal_filter/meal-filter.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  implements OnInit {
  CategoryDropdown: boolean = false;
  userDropdown: boolean = false;
  fromRoute: string = ''; 
  previousRoute: string | null = null; 
  showAdminButton = false;
  adminLink = '/admin';
  changeViewText = 'Vista de Administrador';
  constructor(
    private mealFilterService: MealFilterService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  )  {
  
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.previousRoute = this.fromRoute;
        this.fromRoute = event.urlAfterRedirects.split('/')[1];
      }
    });
  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.activatedRoute.root.firstChild?.snapshot.routeConfig?.path;
        if (currentRoute === '' || currentRoute === 'detail/:id') {
          this.changeViewText = 'Vista de Administrador';
          this.adminLink = '/admin';
        } else {
          this.changeViewText = 'Vista de Usuario';
          this.adminLink = '/';
        }
      }
    });
  }
  
 
  onCategorySelected(category: string | null): void {
    this.mealFilterService.setSelectedCategory(category);
  }

  toggleCategoryDropdown(): void {
    this.CategoryDropdown = !this.CategoryDropdown;
  }

  toggleUserDropdown(): void {
    this.userDropdown = !this.userDropdown;
  }

  navigateToMainPageAndFilter(category: string | null): void {
    const targetRoute = (this.fromRoute === 'admin' || this.previousRoute === 'admin') ? '/admin' : '/';
    this.router.navigate([targetRoute]);
    this.onCategorySelected(category);
  }
  
  
}
