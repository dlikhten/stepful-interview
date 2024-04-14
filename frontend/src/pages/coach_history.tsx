import { FormatDate } from 'components/FormatDate';
import { ViewSession } from 'components/pages/ViewSession';
import { createSWRKey } from 'concerns/jsonapi_utils';
import { SessionRecord } from 'models/SessionRecord';
import Link from 'next/link';
import Loading from 'pages/_loading';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import useSWR from 'swr';

// TODO: There is no pagination here. This should definitely be laid out and paginated better than anything in this UI
export default function CoachHistory() {
  const sessionDependencyGraph = 'student';

  const {
    data: sessions,
    isLoading: isLoadingSessions,
    mutate: mutateSessions,
  } = useSWR(createSWRKey(SessionRecord, { includes: sessionDependencyGraph, per: 1000 }), async () => {
    const raw = await SessionRecord.includes(sessionDependencyGraph)
      .per(1000)
      .where({
        historical_only: true,
      })
      .order('start_time')
      .all();
    return raw?.data;
  });

  const currentEmail = useSelector((state: RootState) => state.login.currentEmail);

  if (!sessions || isLoadingSessions) {
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
          <h1 className="text-3xl mb-4">Historical Sessions</h1>
          {sessions.map(session => (
            <div>
              <ViewSession key={session.id} session={session} otherSide={session.student} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
