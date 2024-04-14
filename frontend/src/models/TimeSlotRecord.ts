import { ApplicationRecord } from 'models/ApplicationRecord';
import { CoachTimeSlotRecord } from 'models/CoachTimeSlotRecord';
import { Attr, HasMany, Model } from 'spraypaint';

@Model()
export class TimeSlotRecord extends ApplicationRecord {
  static jsonapiType = 'time_slot'
  static endpoint = '/time_slots'

  @Attr startTime!: string;
  @Attr endTime!: string;

  @HasMany('coach_time_slots') coachTimeSlots!: CoachTimeSlotRecord[];
}
