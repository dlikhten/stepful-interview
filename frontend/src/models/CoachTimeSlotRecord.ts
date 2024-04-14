import { ApplicationRecord } from 'models/ApplicationRecord';
import { SessionRecord } from 'models/SessionRecord';
import { TimeSlotRecord } from 'models/TimeSlotRecord';
import { UserRecord } from 'models/UserRecord';
import { BelongsTo, HasOne, Model } from 'spraypaint';

@Model()
export class CoachTimeSlotRecord extends ApplicationRecord {
  static jsonapiType = 'coach_time_slot'
  static endpoint = '/coach_time_slots'

  @BelongsTo('time_slot') timeSlot!: TimeSlotRecord;
  @BelongsTo('user') coach!: UserRecord;
  @HasOne('session') session!: SessionRecord;
}
