import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    google?: any;
  }
}

interface Props {
  onCredential: (credential: string) => void;
}

export default function GoogleButton({ onCredential }: Props) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) return;

    const renderButton = () => {
      if (!window.google || !divRef.current) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response: { credential: string }) => onCredential(response.credential),
      });
      window.google.accounts.id.renderButton(divRef.current, {
        theme: 'filled_black',
        size: 'large',
        shape: 'pill',
        width: 320,
      });
    };

    if (window.google) {
      renderButton();
    } else {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = renderButton;
      document.body.appendChild(script);
    }
  }, [onCredential]);

  if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) return null;

  return <div ref={divRef} />;
}
