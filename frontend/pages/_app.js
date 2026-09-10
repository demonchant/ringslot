import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const authPages = ['/login', '/register'];
    if (authPages.includes(router.pathname)) {
      try {
        const token = localStorage.getItem('rs_token');
        if (token) router.replace('/dashboard');
      } catch {}
    }
  }, [router.pathname]);

  return <Component {...pageProps} />;
}
