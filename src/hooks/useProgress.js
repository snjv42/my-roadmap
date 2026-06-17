import { useState, useEffect, useRef, useCallback } from "react";
import { supabaseConfigured } from "../lib/supabase.js";
import {
  loadLocalProgress,
  saveLocalProgress,
  fetchRemoteProgress,
  upsertRemoteProgress,
} from "../lib/progress.js";

export function useProgress(userId) {
  const [checked, setChecked] = useState({});
  const [progressReady, setProgressReady] = useState(!supabaseConfigured);
  const [syncError, setSyncError] = useState(null);
  const saveTimeout = useRef(null);

  const persistProgress = useCallback(async (next, uid) => {
    if (!supabaseConfigured || !uid) {
      saveLocalProgress(next);
      return;
    }

    try {
      await upsertRemoteProgress(uid, next);
      saveLocalProgress(next);
      setSyncError(null);
    } catch (err) {
      setSyncError(err.message ?? "Could not save progress.");
      saveLocalProgress(next);
    }
  }, []);

  const scheduleSave = useCallback((next, uid) => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      persistProgress(next, uid);
    }, 400);
  }, [persistProgress]);

  useEffect(() => {
    if (!supabaseConfigured) {
      loadLocalProgress().then(setChecked);
      return;
    }

    if (!userId) {
      setProgressReady(true);
      setChecked({});
      return;
    }

    let cancelled = false;
    setProgressReady(false);
    setSyncError(null);

    (async () => {
      try {
        const remote = await fetchRemoteProgress(userId);
        if (cancelled) return;

        if (remote && Object.keys(remote).length > 0) {
          setChecked(remote);
          saveLocalProgress(remote);
          return;
        }

        const local = await loadLocalProgress();
        if (cancelled) return;

        if (Object.keys(local).length > 0) {
          setChecked(local);
          await upsertRemoteProgress(userId, local);
          return;
        }

        setChecked({});
      } catch (err) {
        if (!cancelled) {
          setSyncError(err.message ?? "Could not load progress.");
          const local = await loadLocalProgress();
          setChecked(local);
        }
      } finally {
        if (!cancelled) setProgressReady(true);
      }
    })();

    return () => {
      cancelled = true;
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [userId]);

  const toggle = (key) => {
    setChecked((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (supabaseConfigured && userId) {
        scheduleSave(next, userId);
      } else {
        saveLocalProgress(next);
      }
      return next;
    });
  };

  const clearProgress = () => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    setChecked({});
  };

  return { checked, progressReady, syncError, toggle, clearProgress };
}
