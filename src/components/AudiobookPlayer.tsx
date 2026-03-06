import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

type YTPlayer = {
  destroy: () => void;
  getCurrentTime: () => number;
  loadVideoById: (videoId: string) => void;
  pauseVideo: () => void;
  playVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
};

type YTPlayerEvent = {
  data: number;
};

type YTNamespace = {
  PlayerState: {
    ENDED: number;
    PAUSED: number;
    PLAYING: number;
  };
  Player: new (
    elementId: string,
    config: {
      height?: string;
      width?: string;
      videoId: string;
      playerVars?: Record<string, number>;
      events?: {
        onReady?: () => void;
        onStateChange?: (event: YTPlayerEvent) => void;
      };
    },
  ) => YTPlayer;
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: (() => void) | undefined;
  }
}

let youtubeApiPromise: Promise<YTNamespace> | null = null;

function loadYouTubeIframeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  if (youtubeApiPromise) {
    return youtubeApiPromise;
  }

  youtubeApiPromise = new Promise<YTNamespace>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>('script[src="https://www.youtube.com/iframe_api"]');

    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      if (window.YT?.Player) {
        resolve(window.YT);
      } else {
        reject(new Error("YouTube Player API no disponible."));
      }
    };

    if (existingScript) {
      existingScript.addEventListener("error", () => reject(new Error("No se pudo cargar YouTube Player API.")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => reject(new Error("No se pudo cargar YouTube Player API."));
    document.head.appendChild(script);
  });

  return youtubeApiPromise;
}

export type AudiobookPlayerHandle = {
  play: () => void;
  pause: () => void;
  stop: () => void;
  seekBy: (seconds: number) => void;
  getCurrentTime: () => number;
};

type AudiobookPlayerProps = {
  videoId?: string | null;
  title?: string;
  onReady?: () => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
};

export const AudiobookPlayer = forwardRef<AudiobookPlayerHandle, AudiobookPlayerProps>(function AudiobookPlayer(
  { videoId, title, onReady, onPlayStateChange },
  ref,
) {
  const cleanId = videoId?.trim() || "";
  const playerId = useId().replace(/:/g, "");
  const playerRef = useRef<YTPlayer | null>(null);
  const onReadyRef = useRef(onReady);
  const onPlayStateChangeRef = useRef(onPlayStateChange);
  const [isPlayerLoading, setIsPlayerLoading] = useState(Boolean(cleanId));
  const [playerError, setPlayerError] = useState<string | null>(null);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    onPlayStateChangeRef.current = onPlayStateChange;
  }, [onPlayStateChange]);

  useImperativeHandle(
    ref,
    () => ({
      play: () => {
        playerRef.current?.playVideo();
      },
      pause: () => {
        playerRef.current?.pauseVideo();
      },
      stop: () => {
        playerRef.current?.pauseVideo();
        playerRef.current?.seekTo(0, true);
      },
      seekBy: (seconds: number) => {
        const current = playerRef.current?.getCurrentTime() || 0;
        const target = Math.max(0, current + seconds);
        playerRef.current?.seekTo(target, true);
      },
      getCurrentTime: () => playerRef.current?.getCurrentTime() || 0,
    }),
    [],
  );

  useEffect(() => {
    if (!cleanId) {
      setIsPlayerLoading(false);
      setPlayerError(null);
      onPlayStateChangeRef.current?.(false);
      playerRef.current?.destroy();
      playerRef.current = null;
      return;
    }

    let cancelled = false;
    setIsPlayerLoading(true);
    setPlayerError(null);

    void loadYouTubeIframeApi()
      .then((YT) => {
        if (cancelled) {
          return;
        }

        playerRef.current?.destroy();
        playerRef.current = new YT.Player(playerId, {
          height: "100%",
          width: "100%",
          videoId: cleanId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            rel: 0,
            modestbranding: 1,
          },
          events: {
            onReady: () => {
              if (cancelled) {
                return;
              }
              setIsPlayerLoading(false);
              onReadyRef.current?.();
            },
            onStateChange: (event) => {
              if (cancelled) {
                return;
              }

              if (event.data === YT.PlayerState.PLAYING) {
                onPlayStateChangeRef.current?.(true);
                return;
              }

              if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
                onPlayStateChangeRef.current?.(false);
              }
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) {
          setIsPlayerLoading(false);
          setPlayerError("No se pudo cargar el reproductor.");
          onPlayStateChangeRef.current?.(false);
        }
      });

    return () => {
      cancelled = true;
      onPlayStateChangeRef.current?.(false);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [cleanId, playerId]);

  const iframeTitle = useMemo(() => (title ? `Audiolibro de ${title}` : "Audiolibro"), [title]);

  if (!cleanId) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        Este libro no tiene audiolibro disponible por ahora.
      </div>
    );
  }

  if (playerError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
        {playerError}
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-sm">
      {isPlayerLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70 text-sm text-white">
          Cargando reproductor...
        </div>
      )}
      <div
        id={playerId}
        aria-label={iframeTitle}
        className="h-full w-full"
        title={iframeTitle}
      />
    </div>
  );
});
