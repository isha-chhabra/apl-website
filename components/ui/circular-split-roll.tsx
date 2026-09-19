"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
// Phone address bars collapse while scrolling. Do not re-measure for that.
ScrollTrigger.config({ ignoreMobileResize: true });

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

const TAU = Math.PI * 2;
const PHONE_MAX_WIDTH = 767;
const DESKTOP_WIDTH = 1200;

const LEFT_DEPTH_MAX = 30;
const RIGHT_DEPTH_MAX = 40;
const DEPTH_MIN = -1;
const DEPTH_MAX = 1;
const Z_INDEX_MIN = 1;

export interface CircularSplitRollItem {
  id?: string | number;
  title?: string;
  /** Leave empty to show a placeholder tile. */
  image?: string;
  alt?: string;
}

const defaultItems: CircularSplitRollItem[] = [
  "Aperture",
  "Lumen",
  "Halcyon",
  "Meridian",
  "Cascade",
  "Vertex",
  "Solace",
  "Quill",
  "Ember",
  "Drift",
].map((title, id) => ({ id, title, alt: title }));

function wrapProgress(value: number) {
  let wrappedValue = value % 1;
  if (wrappedValue < 0) wrappedValue += 1;
  return wrappedValue;
}

function getCircularPosition(
  progress: number,
  radiusX: number,
  radiusY: number,
  angleOffset = 0
) {
  const angle = progress * TAU + angleOffset;

  return {
    angle,
    x: Math.sin(angle) * radiusX,
    y: Math.cos(angle) * radiusY,
    verticalDepth: Math.cos(angle),
    horizontalDepth: Math.sin(angle),
  };
}

function getStrength(value: number) {
  return gsap.utils.clamp(
    0,
    1,
    gsap.utils.mapRange(DEPTH_MIN, DEPTH_MAX, 0, 1, value)
  );
}

function shapeFocus(strength: number, start = 0.42, power = 2.8) {
  const normalized = gsap.utils.clamp(0, 1, (strength - start) / (1 - start));
  return Math.pow(normalized, power);
}

/**
 * Where everything sits for the current stage size.
 * The two wheels turn against each other and meet at the centre seam:
 * titles on the left wheel line up to the left of it, photos to the right.
 */
function computeLayout(
  width: number,
  height: number,
  count: number,
  radius: number,
  cardW: number,
  cardH: number,
  phoneCenterOffset: number
) {
  const phone = width <= PHONE_MAX_WIDTH;

  if (phone) {
    const cw = gsap.utils.clamp(108, 150, width * 0.34);
    // Radius that keeps neighbouring photos about 120px apart along the arc.
    const byCount = 120 / Math.sin(TAU / Math.max(count, 3));
    const R = gsap.utils.clamp(160, height * 0.46, byCount);
    const gap = 8;
    return {
      R,
      cw,
      ch: cw,
      titleX: width / 2 - gap,
      imageX: width / 2 + gap,
      cy: height / 2 + phoneCenterOffset,
    };
  }

  const factor = width < DESKTOP_WIDTH ? width / DESKTOP_WIDTH : 1;
  const gap = width * 0.09;
  return {
    R: Math.min(radius * factor, height * 0.55),
    cw: cardW * factor,
    ch: cardH * factor,
    titleX: width / 2 - gap,
    imageX: width / 2 + gap,
    cy: height / 2,
  };
}

function Placeholder({ label = "Photo coming soon" }: { label?: string }) {
  return (
    <div className="ph absolute inset-0">
      <div className="ph-hatch absolute inset-0" />
      <div className="relative grid justify-items-center gap-1.5 p-2 text-center font-mono text-[11px] leading-snug md:text-xs">
        <Camera className="size-6 text-brand-ink" strokeWidth={1.5} aria-hidden="true" />
        <span>{label}</span>
      </div>
    </div>
  );
}

interface CircularSplitRollCompProps {
  items?: CircularSplitRollItem[];
  className?: string;
  /** Optional background override. Falls back to the theme background. */
  background?: string;
  /** Optional title colour override. Falls back to the theme foreground. */
  titleColor?: string;
  /** Scroll distance per item, as a percentage of the viewport height. */
  sectionHeight?: number;
  /** Arc radius on laptops. Phones size themselves. */
  radius?: number;
  /** Card size on laptops. Phones size themselves. */
  cardWidth?: number;
  cardHeight?: number;
  /** Nudge the wheel down (or up) on phones, in px, to clear fixed bars. */
  phoneCenterOffset?: number;
  pinSpacing?: boolean;
  scrub?: number;
  textCenterScale?: number;
  textSideScale?: number;
  textCenterOpacity?: number;
  textSideOpacity?: number;
  imageCenterScale?: number;
  imageSideScale?: number;
  imageCenterOpacity?: number;
  imageSideOpacity?: number;
  textFocusStart?: number;
  textFocusPower?: number;
  imageFocusStart?: number;
  imageFocusPower?: number;
  /** Angle (radians) on the circle where a title comes into focus. */
  leftAngleOffset?: number;
  /** Angle (radians) on the circle where an image comes into focus. */
  rightAngleOffset?: number;
  /** Shift the focus by a fraction of one item. */
  focusPhase?: number;
  leftDepthMax?: number;
  rightDepthMax?: number;
  gridImageClassName?: string;
  gridCardClassName?: string;
  gridTitleClassName?: string;
  "aria-label"?: string;
}

function CircularSplitRollComp({
  items = defaultItems,
  className = "",
  background,
  titleColor,
  sectionHeight = 55,

  radius = 500,
  cardWidth = 205,
  cardHeight = 205,
  phoneCenterOffset = 0,

  pinSpacing = true,
  scrub = 0.8,

  textCenterScale = 1,
  textSideScale = 0.68,
  textCenterOpacity = 1,
  textSideOpacity = 0.18,

  imageCenterScale = 1,
  imageSideScale = 0.58,
  imageCenterOpacity = 1,
  imageSideOpacity = 0.14,

  textFocusStart = 0.42,
  textFocusPower = 2.6,
  imageFocusStart = 0.45,
  imageFocusPower = 3.2,

  leftAngleOffset = Math.PI,
  rightAngleOffset = 0,
  focusPhase = 0,
  leftDepthMax = LEFT_DEPTH_MAX,
  rightDepthMax = RIGHT_DEPTH_MAX,

  gridImageClassName = "",
  gridCardClassName = "",
  gridTitleClassName = "",
  "aria-label": ariaLabel,
}: CircularSplitRollCompProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const safeItems = useMemo(() => {
    return items.map((item, index) => ({
      id: item.id ?? index,
      title: item.title ?? `Item ${index + 1}`,
      image: item.image ?? "",
      alt: item.alt ?? item.title ?? `Item ${index + 1}`,
    }));
  }, [items]);

  useEffect(() => {
    if (reducedMotion || !rootRef.current || !stickyRef.current) return;

    const root = rootRef.current;
    const stage = stickyRef.current;
    const total = safeItems.length;
    if (!total) return;

    const ctx = gsap.context(() => {
      const leftNodes = gsap.utils.toArray<HTMLElement>(
        ".circular-scroll-showcase__left-item",
        stage
      );
      const rightNodes = gsap.utils.toArray<HTMLElement>(
        ".circular-scroll-showcase__right-item",
        stage
      );

      // Where each wheel's own focus point sits on its circle.
      const leftFocus = wrapProgress((Math.PI / 2 - leftAngleOffset) / TAU);
      const rightFocus = wrapProgress(((3 * Math.PI) / 2 - rightAngleOffset) / TAU);

      let layout = computeLayout(
        stage.clientWidth,
        stage.clientHeight,
        total,
        radius,
        cardWidth,
        cardHeight,
        phoneCenterOffset
      );
      let lastProgress = 0;

      const measure = () => {
        layout = computeLayout(
          stage.clientWidth,
          stage.clientHeight,
          total,
          radius,
          cardWidth,
          cardHeight,
          phoneCenterOffset
        );
        root.style.setProperty("--css-card-width", `${layout.cw}px`);
        root.style.setProperty("--css-card-height", `${layout.ch}px`);
      };

      const render = (scrollProgress: number) => {
        lastProgress = scrollProgress;
        // Stop on the last item instead of wrapping back round to the first.
        const progress = (scrollProgress * (total - 1)) / total;
        const { R, titleX, imageX, cy } = layout;

        leftNodes.forEach((node, index) => {
          const localProgress = wrapProgress(
            index / total - progress + leftFocus + focusPhase / total
          );
          const position = getCircularPosition(localProgress, R, R, leftAngleOffset);
          const focusStrength = shapeFocus(
            getStrength(position.horizontalDepth),
            textFocusStart,
            textFocusPower
          );

          gsap.set(node, {
            x: titleX - R + position.x,
            y: cy + position.y,
            xPercent: -100,
            yPercent: -50,
            scale: gsap.utils.interpolate(textSideScale, textCenterScale, focusStrength),
            opacity: gsap.utils.interpolate(textSideOpacity, textCenterOpacity, focusStrength),
            zIndex: Math.round(
              gsap.utils.interpolate(Z_INDEX_MIN, leftDepthMax, focusStrength)
            ),
            transformOrigin: "100% 50%",
          });
        });

        rightNodes.forEach((node, index) => {
          const localProgress = wrapProgress(
            index / total - progress + rightFocus + focusPhase / total
          );
          const position = getCircularPosition(localProgress, R, R, rightAngleOffset);
          const focusStrength = shapeFocus(
            getStrength(-position.horizontalDepth),
            imageFocusStart,
            imageFocusPower
          );

          gsap.set(node, {
            x: imageX + R + position.x,
            y: cy + position.y,
            xPercent: 0,
            yPercent: -50,
            scale: gsap.utils.interpolate(imageSideScale, imageCenterScale, focusStrength),
            opacity: gsap.utils.interpolate(imageSideOpacity, imageCenterOpacity, focusStrength),
            zIndex: Math.round(
              gsap.utils.interpolate(Z_INDEX_MIN, rightDepthMax, focusStrength)
            ),
            transformOrigin: "0% 50%",
          });
        });
      };

      measure();
      render(0);

      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: () =>
          `+=${Math.round(
            window.innerHeight * (sectionHeight / 100) * Math.max(total - 1, 1)
          )}`,
        pin: stage,
        scrub,
        pinSpacing,
        invalidateOnRefresh: true,
        onUpdate: (self) => render(self.progress),
        onRefresh: (self) => {
          measure();
          render(self.progress ?? lastProgress);
        },
      });
    }, root);

    return () => ctx.revert();
  }, [
    reducedMotion,
    safeItems,
    scrub,
    pinSpacing,
    sectionHeight,
    radius,
    cardWidth,
    cardHeight,
    phoneCenterOffset,
    textCenterScale,
    textSideScale,
    textCenterOpacity,
    textSideOpacity,
    imageCenterScale,
    imageSideScale,
    imageCenterOpacity,
    imageSideOpacity,
    textFocusStart,
    textFocusPower,
    imageFocusStart,
    imageFocusPower,
    leftAngleOffset,
    rightAngleOffset,
    focusPhase,
    leftDepthMax,
    rightDepthMax,
  ]);

  return (
    <section
      ref={rootRef}
      aria-label={ariaLabel}
      className={`relative w-full ${background ? "" : "bg-background"} ${titleColor ? "" : "text-foreground"} ${className}`}
      style={
        {
          "--css-card-width": `${cardWidth}px`,
          "--css-card-height": `${cardHeight}px`,
          ...(background ? { background } : null),
          ...(titleColor ? { color: titleColor } : null),
        } as React.CSSProperties & Record<string, string | number>
      }
    >
      {/* The wheel is decorative. The list below carries the content. */}
      <div
        ref={stickyRef}
        aria-hidden="true"
        className={`relative h-dvh min-h-[520px] w-full overflow-hidden ${reducedMotion ? "hidden" : ""}`}
      >
        {safeItems.map((item) => (
          <div
            key={`t-${item.id}`}
            className="circular-scroll-showcase__left-item pointer-events-none absolute top-0 left-0 max-w-[calc(50vw-22px)] text-right font-display text-[clamp(17px,4.9vw,21px)] leading-[1.12] font-semibold tracking-[-0.02em] opacity-0 will-change-[transform,opacity] md:max-w-[38vw] md:text-[clamp(26px,2.6vw,46px)]"
          >
            {item.title}
          </div>
        ))}

        {safeItems.map((item) => (
          <div
            key={`i-${item.id}`}
            className="circular-scroll-showcase__right-item pointer-events-none absolute top-0 left-0 h-(--css-card-height,132px) w-(--css-card-width,132px) opacity-0 will-change-[transform,opacity]"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[20px] border border-line bg-sunken shadow-float md:rounded-[22px]">
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.image}
                  alt=""
                  className="pointer-events-none absolute inset-0 block h-full w-full object-cover select-none"
                  draggable="false"
                />
              ) : (
                <Placeholder />
              )}
            </div>
          </div>
        ))}
      </div>

      <ul
        className={
          reducedMotion
            ? "mx-auto grid w-full max-w-5xl grid-cols-2 gap-4 px-5 py-10 md:grid-cols-3 md:gap-5"
            : "sr-only"
        }
      >
        {safeItems.map((item) => (
          <li key={item.id} className={`w-full ${gridCardClassName}`}>
            <div
              className={`relative aspect-square w-full overflow-hidden rounded-[18px] border border-line bg-sunken ${gridImageClassName}`}
            >
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.image}
                  alt={item.alt}
                  className="absolute inset-0 block h-full w-full object-cover"
                  draggable="false"
                />
              ) : (
                <Placeholder />
              )}
            </div>
            <h3
              className={`mt-3 text-center font-display text-[clamp(16px,4.5vw,22px)] leading-tight font-semibold ${gridTitleClassName}`}
            >
              {item.alt}
            </h3>
          </li>
        ))}
      </ul>
    </section>
  );
}

export interface CircularSplitRollProps
  extends Omit<CircularSplitRollCompProps, "radius" | "cardWidth" | "cardHeight"> {
  /** Arc radius on laptops. Phones size themselves. */
  radius?: number;
  /** Card size on laptops. Phones size themselves. */
  cardSize?: number;
  cardWidth?: number;
  cardHeight?: number;
}

export default function CircularSplitRoll({
  items = defaultItems,
  radius = 500,
  cardSize = 205,
  sectionHeight = 55,
  cardWidth,
  cardHeight,
  ...rest
}: CircularSplitRollProps) {
  return (
    <CircularSplitRollComp
      items={items}
      sectionHeight={sectionHeight}
      radius={radius}
      cardWidth={cardWidth ?? cardSize}
      cardHeight={cardHeight ?? cardSize}
      {...rest}
    />
  );
}
