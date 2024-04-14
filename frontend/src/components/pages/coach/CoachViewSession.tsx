import { ViewSession } from 'components/pages/student/ViewSession';
import { SessionRecord } from 'models/SessionRecord';

type Props = {
  session: SessionRecord;
};
export function CoachViewSession({ session }: Props) {
  return (
    <div>
      <ViewSession session={session} otherSide={session.student} />
      {(session.satisfactionRating && session.notes) && (
        <div>
          <div>Satisfaction: {session.satisfactionRating}</div>
          <pre>Notes: {session.notes}</pre>
        </div>
      )}
    </div>
  );
}
