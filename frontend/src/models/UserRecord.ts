import { ApplicationRecord } from 'models/ApplicationRecord';
import { Attr, Model } from 'spraypaint';

export enum UserTypes {
  STUDENT = 'student',
  COACH = 'coach'
}

@Model()
export class UserRecord extends ApplicationRecord {
  static jsonapiType = 'user'
  static endpoint = '/users'

  @Attr name!: string;
  @Attr email!: string;
  @Attr phone!: string;
  @Attr userType!: UserTypes;
}
