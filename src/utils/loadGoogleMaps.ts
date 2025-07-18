// utils/loadGoogleMaps.ts
export function loadGoogleMaps(): Promise<void> {
  return new Promise((resolve) => {
    if (window.google) {
      resolve();
      return;
    }

    const checkInterval = setInterval(() => {
      if (window.google) {
        clearInterval(checkInterval);
        resolve();
      }
    }, 100);
  });
}
