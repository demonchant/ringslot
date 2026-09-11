import { useEffect } from 'react';
import { useRouter } from 'next/router';

const INACTIVITY_MS = 10 * 60 * 1000;
const ACTIVITY_KEY = 'rs_last_activity';
const EVENTS = ['pointerdown', 'keydown', 'scroll', 'touchstart'];

export default function InactivityLogout() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('rs_token')) return undefined;

    let timer;
    let lastWrite = 0;

    const signOut = () => {
      localStorage.removeItem('rs_token');
      localStorage.removeItem('rs_user');
      localStorage.removeItem(ACTIVITY_KEY);
      router.replace('/login?reason=inactive');
    };

    const schedule = () => {
      clearTimeout(timer);
      const lastActivity = Number(localStorage.getItem(ACTIVITY_KEY) || Date.now());
      const remaining = INACTIVITY_MS - (Date.now() - lastActivity);
      if (remaining <= 0) return signOut();
      timer = setTimeout(signOut, remaining);
    };

    const recordActivity = () => {
      const now = Date.now();
      if (now - lastWrite < 1000 || !localStorage.getItem('rs_token')) return;
      lastWrite = now;
      localStorage.setItem(ACTIVITY_KEY, String(now));
      schedule();
    };

    const handleVisibility = () => {
      if (document.visibilityState !== 'visible') return;
      const lastActivity = Number(localStorage.getItem(ACTIVITY_KEY) || 0);
      if (lastActivity && Date.now() - lastActivity >= INACTIVITY_MS) signOut();
      else recordActivity();
    };

    const handleStorage = (event) => {
      if (event.key === 'rs_token' && !event.newValue) signOut();
      if (event.key === ACTIVITY_KEY) schedule();
    };

    const storedActivity = Number(localStorage.getItem(ACTIVITY_KEY) || 0);
    if (storedActivity && Date.now() - storedActivity >= INACTIVITY_MS) {
      signOut();
      return undefined;
    }
    recordActivity();
    EVENTS.forEach((event) => window.addEventListener(event, recordActivity, { passive: true }));
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('storage', handleStorage);

    return () => {
      clearTimeout(timer);
      EVENTS.forEach((event) => window.removeEventListener(event, recordActivity));
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('storage', handleStorage);
    };
  }, [router, router.pathname]);

  return null;
}
