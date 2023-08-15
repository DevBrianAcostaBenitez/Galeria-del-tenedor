import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  CategoryDropdown: boolean = false;
  userDropdown:  boolean = false;
toggleCategoryDropdown() {
    this.CategoryDropdown = !this.CategoryDropdown;
}

toggleUserDropdown() {
  this.userDropdown = !this.userDropdown;
}
}

