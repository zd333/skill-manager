import * as moment from 'moment';

export interface User {
  _id: string;
  name: string;
  email: string;
  permissions?: Array<string>;
  isActive: boolean;
  skillMarks: [SkillMark];
}

class SkillMark {
  _id: string;
  streamId: string;
  streamName: string;
  skillId: string;
  skillName: string;
  value: number;
  private approvement: {
    postedAt: string;
    approverName: string;
    approverId: string;
  };

  private postedAt: string; // date in raw back-end ISO format

  get postedAtMoment(): moment.Moment {
    return moment(this.postedAt);
  }
  get isApproved(): boolean {
    return this.approvement && this.approvement.postedAt && this.approvement.approverName && Boolean(this.approvement.approverId);
  }
  get dateApproved(): moment.Moment {
    if (!this.isApproved) {
      return null;
    }
    return moment(this.approvement.postedAt);
  }
  get approver(): { name: string, id: string } {
    const name = this.isApproved ? this.approvement.approverName : '';
    const id = this.isApproved ? this.approvement.approverId : '';
    return {
      name,
      id
    };
  }
}
