import * as moment from 'moment';

interface PdpGoal {
  _id: string;
  isAchieved: boolean;
  value: number;
  streamId: string;
  streamName: string;
  skillId: string;
  skillName: string;
}

/**
 * This represents Pdp received from back-end
 */
export interface RawPdp {
  _id: string;
  userId: string;
  userName: string;
  creatorId: string;
  creatorName: string;
  plannedFinishAt: string;
  isAchieved: boolean;
  postedAt: string;
  goals: Array<PdpGoal>;
}

export class Pdp {
  public _id: string;
  public userId: string;
  public userName: string;
  public creatorId: string;
  public creatorName: string;
  public isAchieved: boolean;
  public goals: Array<PdpGoal>;
  private postedAt: string;
  private plannedFinishAt: string;

  constructor(rawPdp: RawPdp) {
    this._id = rawPdp._id;
    this.userId = rawPdp.userId;
    this.userName = rawPdp.userName;
    this.creatorId = rawPdp.creatorId;
    this.creatorName = rawPdp.creatorName;
    this.isAchieved = rawPdp.isAchieved;
    this.goals = rawPdp.goals;
    this.postedAt = rawPdp.postedAt;
  }

  get postedAtMoment(): moment.Moment {
    return moment(this.postedAt);
  }
}
