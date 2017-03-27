import { RawSkillMark } from './skill-mark.model';

export interface User {
  _id: string;
  name: string;
  email: string;
  permissions?: Array<string>;
  isActive: boolean;
  skillMarks?: Array<RawSkillMark>;
}
