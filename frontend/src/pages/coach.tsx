import { FormatDate } from 'components/FormatDate';
import { AvailableTimeslot } from 'components/pages/student/AvailableTimeslot';
import { createSWRKey, useMergeIncludes } from 'concerns/jsonapi_utils';
import { CoachTimeSlotRecord } from 'models/CoachTimeSlotRecord';
import { SessionRecord } from 'models/SessionRecord';
import { TimeSlotRecord } from 'models/TimeSlotRecord';
import Link from 'next/link';
import Loading from 'pages/_loading';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import useSWR from 'swr';

// TODO: There is no pagination here. This should definitely be laid out and paginated better than anything in this UI
export default function Coach() {
  const coachTimeSlotRecordDependencyGraph = "session.student,time_slot"

  const {
    data: timeSlots,
    isLoading: isLoadingTimeSlots,
    mutate: mutateTimeSlots,
  } = useSWR(
    createSWRKey(CoachTimeSlotRecord, {
      includes: coachTimeSlotRecordDependencyGraph,
      per: 1000,
      where: {
        active_only: true,
        own_only: true
      },
    }),
    async () => {
      const raw = await CoachTimeSlotRecord.includes(coachTimeSlotRecordDependencyGraph)
        .per(1000)
        .where({
          active_only: true,
          own_only: true
        })
        .order('start_time') // not an attribute, but the server allows this
        .all();
      return raw?.data;
    }
  );

  const currentEmail = useSelector((state: RootState) => state.login.currentEmail);

  if (!timeSlots || isLoadingTimeSlots) {
    return <Loading />;
  } else {
    return (
      <div className="bg-blue-300 w-full h-screen p-4">
        <div className="w-1/2 flex flex-col m-auto">
          <div className="text-sm mb-4">Logged in as: {currentEmail}</div>
          <div>
            <Link href="/login">Logout</Link>
          </div>
        </div>
        <div className="w-1/2 flex flex-col m-auto my-4">
          <h1 className="text-3xl mb-4">Schedule</h1>
          {timeSlots.map(timeSlot => (
            <div key={timeSlot.id} className="flex-nowrap flex space-x-1">
              <div>
                <FormatDate.LongForm date={timeSlot.timeSlot.startTime}/>
                -
                <FormatDate.LongForm date={timeSlot.timeSlot.endTime}/>
              </div>
              {timeSlot.session ? (
                <div>
                  with {timeSlot.session.student.name} -- {timeSlot.session.student.phone}
                </div>
              ) : (
                <div>available</div>
              )}
            </div>
        ))}
      </div>
  </div>
  )
    ;
  }
}
