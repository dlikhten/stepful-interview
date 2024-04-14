import { FormatDate } from 'components/FormatDate';
import { SessionRecord } from 'models/SessionRecord';
import { UserRecord } from 'models/UserRecord';

type Props = {
  session: SessionRecord,
  otherSide: UserRecord
}

export function ViewSession({ session, otherSide }: Props) {
  return <div key={session.id} className="flex-nowrap flex space-x-1">
    <div>
      <FormatDate.LongForm date={session.startTime}/>
      -
      <FormatDate.LongForm date={session.endTime}/>
    </div>
    <div>with</div>
    <div>
      {otherSide.name} -- Phone #: {otherSide.phone}
    </div>
  </div>
}
