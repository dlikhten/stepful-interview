import { Redirect } from 'components/Redirect';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

export default function Home() {
  const currentEmail = useSelector((state: RootState) => state.login.currentEmail);

  if (currentEmail) {
    // redirect to the main page of the exorcise
    return <Redirect destination="/thingy" />;
  } else {
    return <Redirect destination="/login" />;
  }
}
