"use client";

import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type Item = { src: string; label: string };

type Props = {
	items: Item[];
	index: number;
	onClose: () => void;
	onNavigate: (index: number) => void;
};

export default function Lightbox({ items, index, onClose, onNavigate }: Props) {
	const touchStartX = useRef(0);
	const item = items[index];

	const prev = useCallback(
		() => onNavigate((index - 1 + items.length) % items.length),
		[index, items.length, onNavigate],
	);
	const next = useCallback(
		() => onNavigate((index + 1) % items.length),
		[index, items.length, onNavigate],
	);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowLeft") prev();
			if (e.key === "ArrowRight") next();
		};
		document.addEventListener("keydown", onKey);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
		};
	}, [onClose, prev, next]);

	return createPortal(
		<div
			role="dialog"
			aria-modal="true"
			aria-label={item.label}
			onClick={onClose}
			onTouchStart={(e) => {
				touchStartX.current = e.touches[0].clientX;
			}}
			onTouchEnd={(e) => {
				const diff = touchStartX.current - e.changedTouches[0].clientX;
				if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
			}}
			style={{
				position: "fixed",
				inset: 0,
				zIndex: 1000,
				backgroundColor: "rgba(0,0,0,0.96)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}>
			{/* Image */}
			<div
				onClick={(e) => e.stopPropagation()}
				style={{
					position: "relative",
					width: "min(90vw, 1100px)",
					height: "min(82vh, 800px)",
				}}>
				<Image
					src={item.src}
					alt={item.label}
					fill
					style={{ objectFit: "contain" }}
					sizes="90vw"
					priority
				/>
			</div>

			{/* Close */}
			<button
				onClick={onClose}
				aria-label="Close"
				style={{
					position: "absolute",
					top: "1.5rem",
					right: "1.5rem",
					background: "none",
					border: "1px solid rgba(255,255,255,0.2)",
					color: "#fff",
					width: "44px",
					height: "44px",
					cursor: "pointer",
					fontSize: "1.1rem",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					transition: "border-color 0.2s",
				}}
				onMouseEnter={(e) =>
					(e.currentTarget.style.borderColor = "var(--accent-gold)")
				}
				onMouseLeave={(e) =>
					(e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")
				}>
				✕
			</button>

			{/* Prev */}
			{items.length > 1 && (
				<button
					onClick={(e) => {
						e.stopPropagation();
						prev();
					}}
					aria-label="Previous image"
					style={{
						position: "absolute",
						left: "1.25rem",
						top: "50%",
						transform: "translateY(-50%)",
						background: "none",
						border: "1px solid rgba(255,255,255,0.2)",
						color: "#fff",
						width: "48px",
						height: "48px",
						cursor: "pointer",
						fontSize: "1.4rem",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						transition: "border-color 0.2s",
					}}
					onMouseEnter={(e) =>
						(e.currentTarget.style.borderColor = "var(--accent-gold)")
					}
					onMouseLeave={(e) =>
						(e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")
					}>
					‹
				</button>
			)}

			{/* Next */}
			{items.length > 1 && (
				<button
					onClick={(e) => {
						e.stopPropagation();
						next();
					}}
					aria-label="Next image"
					style={{
						position: "absolute",
						right: "1.25rem",
						top: "50%",
						transform: "translateY(-50%)",
						background: "none",
						border: "1px solid rgba(255,255,255,0.2)",
						color: "#fff",
						width: "48px",
						height: "48px",
						cursor: "pointer",
						fontSize: "1.4rem",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						transition: "border-color 0.2s",
					}}
					onMouseEnter={(e) =>
						(e.currentTarget.style.borderColor = "var(--accent-gold)")
					}
					onMouseLeave={(e) =>
						(e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")
					}>
					›
				</button>
			)}

			{/* Caption + counter */}
			<div
				onClick={(e) => e.stopPropagation()}
				style={{
					position: "absolute",
					bottom: "1rem",
					left: "50%",
					transform: "translateX(-50%)",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "0.35rem",
					pointerEvents: "none",
					padding: "0rem 1rem",
				}}>
				<span
					style={{
						fontSize: "0.7rem",
						letterSpacing: "0.2em",
						textTransform: "uppercase",
						color: "var(--accent-gold)",
					}}>
					{index + 1} / {items.length}
				</span>
				<span
					style={{
						fontSize: "0.75rem",
						color: "rgba(255,255,255,0.55)",
						letterSpacing: "0.05em",
					}}>
					{item.label}
				</span>
			</div>
		</div>,
		document.body,
	);
}
