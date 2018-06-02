import {Component, ElementRef, EventEmitter, OnChanges, OnInit, Output} from '@angular/core';
import {Goal} from '../goals/models/Goal';
import {LoginService} from '../../login/login.service';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges {

  @Output()
  newGoalEvent = new EventEmitter<Goal>();

  searchText: String;
  currentUser: String;

  @Output()
  searchEvent = new EventEmitter<String>();

  constructor(private loginService: LoginService, private elementRef: ElementRef) {
    this.currentUser = localStorage.getItem('username');
  }

  ngOnInit(): void {
    $(this.elementRef.nativeElement).on('show.bs.dropdown', function (e) {
      $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    });

    $(this.elementRef.nativeElement).on('hide.bs.dropdown', function (e) {
      $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
    });
  }

  ngOnChanges() {
    this.currentUser = localStorage.getItem('username');
  }

  newGoal() {
    this.newGoalEvent.emit(Goal.empty());
  }

  search() {
    this.searchEvent.emit(this.searchText);
  }

  logout() {
    this.loginService.logout();
  }
}
