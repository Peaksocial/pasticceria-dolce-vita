/* ---------- Settings ---------- */
const HERO_VIDEO_SRC = '';   // Path to the homepage banner video, e.g. '/media/hero.mp4'. Leave empty to show the photo reel.

/* ---------- Hero video ---------- */
const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (HERO_VIDEO_SRC) {
  const v = document.querySelector<HTMLVideoElement>('.hero-video')!;
  v.src = HERO_VIDEO_SRC;
  v.hidden = false;
  document.querySelector<HTMLElement>('.reel')!.hidden = true;
  if (!reduce) { v.autoplay = true; const p = v.play(); if (p && p.catch) p.catch(function () {}); }
}
