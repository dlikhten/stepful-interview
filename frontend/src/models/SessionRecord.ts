import { ApplicationRecord } from 'models/ApplicationRecord';
import { CoachTimeSlotRecord } from 'models/CoachTimeSlotRecord';
import { UserRecord } from 'models/UserRecord';
import { Attr, BelongsTo, HasOne, Model } from 'spraypaint';

export enum UserTypes {
  STUDENT = 'student',
  COACH = 'coach'
}

@Model()
export class SessionRecord extends ApplicationRecord {
  static jsonapiType = 'session'
  static endpoint = '/sessions'

  @Attr startTime!: string;
  @Attr endTime!: string;
  @Attr satisfactionRating!: number | null
  @Attr notes!: string | null

  @BelongsTo('user') coach!: UserRecord
  @BelongsTo('user') student!: UserRecord
}
