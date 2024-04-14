import { FormatDate } from 'components/FormatDate';
import { ReserveSlotForm } from 'components/pages/student/ReserveSlotForm';
import { mergeIncludes } from 'concerns/jsonapi_utils';
import { TimeSlotRecord } from 'models/TimeSlotRecord';

type Props = {
  timeSlot: TimeSlotRecord;
  onReservationSuccess: () => void;
};

export function AvailableTimeslot({ timeSlot, onReservationSuccess }: Props) {
  return (
    <div>
      <div className="flex-nowrap flex">
        <FormatDate.LongForm date={timeSlot.startTime}/>
        -
        <FormatDate.LongForm date={timeSlot.endTime}/>
        <div className="ml-2">{timeSlot.coachTimeSlots.length} available coaches</div>
      </div>
      <div><ReserveSlotForm timeSlot={timeSlot} onSuccess={onReservationSuccess}/></div>
    </div>
  );
}

AvailableTimeslot.dependencyGraph = {
  timeSlot: mergeIncludes('coach_time_slots', ReserveSlotForm.dependencyGraph.timeSlot),
};
