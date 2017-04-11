import * as moment from 'moment';

export interface Approvement {
  postedAt: string;
  approverName: string;
  approverId: string;
}

/**
 * This represents structure of back-end response
 */
export interface RawSkillMark {
    _id: string;
    value: number;
    postedAt: string;
    streamId: string;
    streamName: string;
    skillId: string;
    skillName: string;
    approvement?: Approvement;
}

/**
 * This contains some common getters which are used in `SkillMark` and `SkillMarksGroupedBySkill`
 */
export class BaseSkillMark {
  constructor(
    public _id: string,
    public value: number,
    private postedAt: string,
    private approvement?: Approvement
  ) { }

  get postedAtMoment(): moment.Moment {
    return moment(this.postedAt);
  }

  get isApproved(): boolean {
    return this.approvement && this.approvement.postedAt && this.approvement.approverName && Boolean(this.approvement.approverId);
  }

  get approvedAtMoment(): moment.Moment {
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

export class SkillMark extends BaseSkillMark {
  public streamId: string;
  public streamName: string;
  public skillId: string;
  public skillName: string;

  constructor(mark: RawSkillMark) {
    super(mark._id, mark.value, mark.postedAt, mark.approvement);
    this.streamId = mark.streamId;
    this.streamName = mark.streamName;
    this.skillId = mark.skillId;
    this.skillName = mark.skillName;
  }
}

export class SkillMarksGroupedBySkill extends Array<any> {
  [index: number]: {
    streamId: string;
    streamName: string;
    skillId: string;
    skillName: string;
    skillMarks: Array<BaseSkillMark>;
  };
}

