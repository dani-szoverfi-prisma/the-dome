"use client";

import { useEffect, useRef, useState } from "react";

/*
  Files expected in /public/videos/ (add as many as needed):
    hero-1.webm  hero-1.mp4
    hero-2.webm  hero-2.mp4
    hero-3.webm  hero-3.mp4
    ...
  Poster in /public/:
    hero-poster.webp  (first frame of hero-1, < 80 KB, WebP quality 75)

  Encoding targets:
    WebM (VP9):  crf 33, bitrate ~800k, 1920×1080, < 4 MB per 15 s clip
    MP4  (H.264): crf 28, bitrate ~1200k, same resolution
*/
const PLAYLIST = [
	{ webm: "/videos/hero-1.webm", mp4: "/videos/hero-1.mov" },
	{ webm: "/videos/hero-2.webm", mp4: "/videos/hero-2.mp4" },
	{ webm: "/videos/hero-3.webm", mp4: "/videos/hero-3.mp4" },
];

const CROSSFADE_MS = 900;

/* Inject WebM + MP4 sources into a video element and call load() */
function loadClip(video: HTMLVideoElement, index: number) {
	const clip =
		PLAYLIST[((index % PLAYLIST.length) + PLAYLIST.length) % PLAYLIST.length];
	while (video.firstChild) video.removeChild(video.firstChild);
	const addSrc = (src: string, type: string) => {
		const s = document.createElement("source");
		s.src = src;
		s.type = type;
		video.appendChild(s);
	};
	addSrc(clip.webm, "video/webm");
	addSrc(clip.mp4, "video/mp4");
	video.load();
}

export default function HeroVideo() {
	const refA = useRef<HTMLVideoElement>(null);
	const refB = useRef<HTMLVideoElement>(null);
	/* 0 = slot A is visible, 1 = slot B is visible */
	const [activeSlot, setActiveSlot] = useState(0);

	/* Use refs for values read inside event callbacks to avoid stale closures */
	const activeSlotRef = useRef(0);
	const nextClipIdxRef =
		useRef(2); /* clip index to load into the idle slot next */
	const cleanupRef = useRef<(() => void) | null>(null);

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const videos = [refA.current!, refB.current!];

		/* Called when the currently-playing video clip ends */
		const handleEnded = (finishedSlot: number) => {
			const nextSlot = finishedSlot === 0 ? 1 : 0;

			/* Switch visible slot */
			activeSlotRef.current = nextSlot;
			setActiveSlot(nextSlot);

			/* Play the pre-loaded clip in the new active slot */
			videos[nextSlot].play().catch(() => {});

			/* Load the clip after next into the now-idle slot */
			loadClip(videos[finishedSlot], nextClipIdxRef.current);
			nextClipIdxRef.current++;
		};

		const onEndA = () => handleEnded(0);
		const onEndB = () => handleEnded(1);

		/* Pause/resume when hero scrolls in and out of view */
		const visibilityObserver = new IntersectionObserver(
			([entry]) => {
				const active = videos[activeSlotRef.current];
				if (entry.isIntersecting) {
					active?.play().catch(() => {});
				} else {
					videos[0].pause();
					videos[1].pause();
				}
			},
			{ threshold: 0.1 },
		);

		const start = () => {
			/* Load first two clips — A plays, B is pre-loaded */
			loadClip(videos[0], 0);
			loadClip(videos[1], 1);
			nextClipIdxRef.current = 2;

			videos[0].addEventListener("ended", onEndA);
			videos[1].addEventListener("ended", onEndB);
			visibilityObserver.observe(videos[0]);

			videos[0].play().catch(() => {});
		};

		/* Defer until browser is idle so the poster (LCP) paints first */
		let idleId: number | ReturnType<typeof setTimeout>;
		if ("requestIdleCallback" in window) {
			idleId = (window as Window & typeof globalThis).requestIdleCallback(
				start,
				{
					timeout: 2000,
				},
			);
		} else {
			idleId = setTimeout(start, 200);
		}

		cleanupRef.current = () => {
			if ("cancelIdleCallback" in window) {
				(window as Window & typeof globalThis).cancelIdleCallback(
					idleId as number,
				);
			} else {
				clearTimeout(idleId as ReturnType<typeof setTimeout>);
			}
			videos[0].removeEventListener("ended", onEndA);
			videos[1].removeEventListener("ended", onEndB);
			videos[0].pause();
			videos[1].pause();
			visibilityObserver.disconnect();
		};

		return () => cleanupRef.current?.();
	}, []);

	return (
		<>
			{/*
        Two video slots — only one visible at a time.
        CSS crossfade (opacity transition) between clips.
        The poster on slot A is the LCP element — it paints immediately
        while the video defers to requestIdleCallback.
      */}
			{([refA, refB] as const).map((ref, i) => (
				<video
					key={i}
					ref={ref}
					muted
					playsInline
					preload="none"
					/* Poster only on slot A — it's the LCP placeholder */
					poster={i === 0 ? "/hero-poster.webp" : undefined}
					aria-hidden
					style={{
						position: "absolute",
						inset: 0,
						width: "100%",
						height: "100%",
						objectFit: "cover",
						zIndex: 0,
						opacity: activeSlot === i ? 1 : 0,
						transition: `opacity ${CROSSFADE_MS}ms ease-in-out`,
					}}
				/>
			))}

			{/* Gradient overlay — ensures hero text stays readable over any clip */}
			<div
				aria-hidden
				style={{
					position: "absolute",
					inset: 0,
					background:
						"linear-gradient(to bottom, rgba(8,13,8,0.55) 0%, rgba(8,13,8,0.25) 45%, rgba(8,13,8,0.75) 100%)",
					zIndex: 1,
				}}
			/>
		</>
	);
}
