import { SkillMarksGroupedBySkill } from '../../skill-marks/shared/skill-mark.model';
import { User } from '../shared/user.model';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../shared/users.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'skdsm-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.styl']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  private subscriptionParams: Subscription;
  private userId: string;
  user: User;
  groupedSkillMarks: SkillMarksGroupedBySkill = [];

  constructor(private route: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit() {
    this.subscriptionParams = this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.loadUserDetails();
    });
  }

  loadUserDetails() {
    this.usersService.getUserDetails(this.userId)
      .subscribe(userDetails => {
        this.groupedSkillMarks = this.usersService.groupSkillMarksBySkill(userDetails.skillMarks);
        this.user = userDetails;
      });
  }

  ngOnDestroy() {
    this.subscriptionParams.unsubscribe();
  }
}
