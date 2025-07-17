import { useRef, useState, useCallback } from 'react';

export type ScriptStatus = 'idle' | 'loading' | 'ready' | 'error';

export function useLazyScriptLoad(src: string): {
  loadScript: () => void;
  status: ScriptStatus;
} {
  const [status, setStatus] = useState<ScriptStatus>('idle');
  const hasLoadedRef = useRef(false);

  const loadScript = useCallback(() => {
    if (!src || hasLoadedRef.current) return;

    hasLoadedRef.current = true;
    setStatus('loading');

    let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.defer = true;
      script.type = 'text/javascript';
      script.setAttribute('data-status', 'loading');
      document.body.appendChild(script);

      const onLoad = () => {
        script?.setAttribute('data-status', 'ready');
        setStatus('ready');
      };

      const onError = () => {
        script?.setAttribute('data-status', 'error');
        setStatus('error');
      };

      script.addEventListener('load', onLoad);
      script.addEventListener('error', onError);
    } else {
      const currentStatus = script.getAttribute('data-status') as ScriptStatus;
      setStatus(currentStatus || 'ready');
    }
  }, [src]);

  return { loadScript, status };
}
