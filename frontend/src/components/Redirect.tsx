import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function Redirect({ destination }: { destination: string }) {
  const router = useRouter();
  useEffect(() => {
    router.replace(destination);
  });

  return null;
}
