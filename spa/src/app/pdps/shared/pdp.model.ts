import * as moment from 'moment';

/**
 * This represents pdp goal which used to send pdp to back-end
 */
interface BasePdpGoal {
  skillId: string;
  value: number;
}

interface PdpGoal extends BasePdpGoal {
  _id: string;
  isAchieved: boolean;
  streamId: string;
  streamName: string;
  skillName: string;
}

export interface BasePdp {
  plannedFinishAt: string;
  userId: string;
  goals: Array<BasePdpGoal>;
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

  constructor(rawPdp) {
    this._id = rawPdp._id;
    this.userId = rawPdp.userId;
    this.userName = rawPdp.userName;
    this.creatorId = rawPdp.creatorId;
    this.creatorName = rawPdp.creatorName;
    this.isAchieved = rawPdp.isAchieved;
    this.goals = rawPdp.goals;
    this.postedAt = rawPdp.postedAt;
    this.plannedFinishAt = rawPdp.plannedFinishAt;
  }

  get postedAtMoment(): moment.Moment {
    return moment(this.postedAt);
  }

  get plannedFinishAtMoment(): moment.Moment {
    return moment(this.plannedFinishAt);
  }
}
