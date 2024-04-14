import { FormatDate } from 'components/FormatDate';
import { createSWRKey } from 'concerns/jsonapi_utils';
import { SessionRecord } from 'models/SessionRecord';
import { TimeSlotRecord } from 'models/TimeSlotRecord';
import Loading from 'pages/_loading';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import useSWR from 'swr';

// TODO: There is no pagination here. This should definitely be laid out and paginated better than anything in this UI
export default function Student() {
  const sessionDependencyGraph = 'coach';

  const {
    data: sessions,
    isLoading: isLoadingSessions,
    mutate: mutateSessions,
  } = useSWR(createSWRKey(SessionRecord, { includes: sessionDependencyGraph, per: 1000 }), async () => {
    const raw = await SessionRecord.includes(sessionDependencyGraph)
      .per(1000)
      .where({
        active_only: true,
      })
      .order("start_time")
      .all();
    return raw?.data;
  });

  const timeSlotDependencyGraph = { coach_time_slots: ['session'] };
  const {
    data: timeSlots,
    isLoading: isLoadingTimeSlots,
    mutate: mutateTimeSlots,
  } = useSWR(
    createSWRKey(TimeSlotRecord, {
      includes: timeSlotDependencyGraph,
      per: 1000,
      where: {
        available_only: true,
        exclude_student_overlap: true,
      },
    }),
    async () => {
      const raw = await TimeSlotRecord.includes(timeSlotDependencyGraph)
        .per(1000)
        .where({
          available_only: true,
          exclude_student_overlap: true,
        })
        .order("start_time")
        .all();
      return raw?.data;
    }
  );

  // TODO: ideally this should be done on the server, but in the interest of time I went with this simple solution
  const filteredTimeSlots = useMemo(() => {
    return timeSlots ? timeSlots.filter(timeSlot => timeSlot.coachTimeSlots.length) : timeSlots
  }, [timeSlots])

  const currentEmail = useSelector((state: RootState) => state.login.currentEmail);

  if (!sessions || !filteredTimeSlots || isLoadingTimeSlots || isLoadingSessions) {
    return <Loading />;
  } else {
    return (
      <div className="bg-blue-300 w-full h-screen p-4">
        <div className="w-1/2 flex flex-col m-auto">
          <div className="text-sm mb-4">Logged in as: {currentEmail}</div>
        </div>
        <div className="w-1/2 flex flex-col m-auto my-4">
          <h1 className="text-3xl mb-4">Scheduled Sessions</h1>
          {sessions.map(session => (
            <div key={session.id} className="flex-nowrap flex space-x-1">
              <div>
                <FormatDate.LongForm date={session.startTime} />
                -
                <FormatDate.LongForm date={session.endTime} />
              </div>
              <div>
                with

              </div>
              <div>
                {session.coach.name} -- {session.coach.phone}
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/2 flex flex-col m-auto my-4">
          <h1 className="text-3xl mb-4">Available Timeslots</h1>
          {filteredTimeSlots.map(timeSlot => (
            <div key={timeSlot.id} className="flex-nowrap flex">
              <FormatDate.LongForm date={timeSlot.startTime} />
              -
              <FormatDate.LongForm date={timeSlot.endTime} />
              <div className="ml-2">{timeSlot.coachTimeSlots.length} available coaches</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
