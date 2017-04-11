export interface Skill {
  _id: string;
  name: string;
  streamId: string;
  streamName?: string;
}

export class SkillsGroupedByStream extends Array<any> {
  [index: number]: {
    streamId: string;
    streamName: string;
    skills: Array<{
      _id: string;
      name: string;
    }>;
  };
}

