"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, X, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/*
 * Radial orbital timeline. Same circle, orbit, auto-rotation, click-to-centre and expanding card as the original.
 * Changes for this site:
 *  - date, status, energy and relatedIds are optional, and their parts of the card only show when given
 *  - the orbit radius follows the width of the container, so it fits a phone
 *  - node labels are centred under their node; on narrow screens they show the short category so they fit
 *  - copper on near-black instead of white on black; the centre orb is copper
 *  - rotation stops for people who ask for reduced motion, and while the circle is off screen
 *  - the open card has a close (x) button, closes on a tap anywhere outside, and reads title, a line, then the text
 *  - motion is calmer: the angle is animated frame by frame (arcs, not straight lines), the pings are slow, and the circle eases in
 */

interface TimelineItem {
  id: number;
  title: string;
  date?: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status?: "completed" | "in-progress" | "pending";
  energy?: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [width, setWidth] = useState<number>(900);
  const [visible, setVisible] = useState<boolean>(true);
  const [shown, setShown] = useState<boolean>(false);
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const angleRef = useRef<number>(0);
  const autoRotateRef = useRef<boolean>(true);
  const tweenRef = useRef<{ from: number; to: number; start: number; dur: number } | null>(null);

  const radius = Math.max(96, Math.min(200, width / 2 - 46));
  const narrow = width < 560;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setWidth(el.getBoundingClientRect().width);
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setShown(true);
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const closeAll = () => {
    setExpandedItems({});
    setActiveNodeId(null);
    setPulseEffect({});
    setAutoRotate(true);
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      closeAll();
    }
  };

  // a tap anywhere outside a node (or its card) closes the open card
  useEffect(() => {
    if (activeNodeId === null) return;
    const onPointerDown = (e: PointerEvent) => {
      if ((e.target as Element | null)?.closest("[data-orbit-node]")) return;
      closeAll();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [activeNodeId]);

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  // one animation loop: slow drift (6 degrees a second, as before) or an eased turn to a chosen node
  useEffect(() => {
    if (viewMode !== "orbital") return;
    let raf = 0;
    let last = 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(64, t - (last || t));
      last = t;
      let a = angleRef.current;
      const tw = tweenRef.current;
      if (tw) {
        const p = Math.min(1, (t - tw.start) / tw.dur);
        const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        a = tw.from + (tw.to - tw.from) * e;
        if (p >= 1) tweenRef.current = null;
      } else if (autoRotateRef.current && visible && !reduceMotion) {
        a = (a + dt * 0.006) % 360;
      } else {
        return;
      }
      angleRef.current = a;
      setRotationAngle(Number(a.toFixed(3)));
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [viewMode, visible, reduceMotion]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    const from = angleRef.current;
    const wanted = 270 - targetAngle;
    const delta = ((((wanted - from) % 360) + 540) % 360) - 180; // shortest way round
    tweenRef.current = { from, to: from + delta, start: performance.now(), dur: reduceMotion ? 1 : 950 };
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: NonNullable<TimelineItem["status"]>): string => {
    switch (status) {
      case "completed":
        return "text-white bg-black border-white";
      case "in-progress":
        return "text-black bg-white border-black";
      case "pending":
        return "text-white bg-black/40 border-white/50";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center overflow-x-clip"
      style={{
        // the visible content runs from a node's top edge to the label under the bottom node; pad it evenly
        height: radius * 2 + (narrow ? 40 : 64) + 48,
        paddingBottom: narrow ? 0 : 24,
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "scale(0.94)",
        filter: shown ? "none" : "blur(6px)",
        transition: "opacity 1s ease, transform 1.2s cubic-bezier(0.16,1,0.3,1), filter 1s ease",
      }}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-[#F58F68] via-[#B4634D] to-[#5A2C22] orbit-breathe flex items-center justify-center z-10">
            <div className="absolute w-20 h-20 rounded-full border border-[#F0C4B3]/25 orbit-ping"></div>
            <div
              className="absolute w-24 h-24 rounded-full border border-[#F0C4B3]/15 orbit-ping"
              style={{ animationDelay: "1.4s" }}
            ></div>
            <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md"></div>
          </div>

          <div
            className="absolute rounded-full border border-white/10"
            style={{ width: radius * 2 - 16, height: radius * 2 - 16 }}
          ></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;
            const energy = item.energy ?? 60;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                data-orbit-node
                className="absolute transition-[opacity] duration-500 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(240,196,179,0.25) 0%, rgba(240,196,179,0) 70%)`,
                    width: `${energy * 0.5 + 40}px`,
                    height: `${energy * 0.5 + 40}px`,
                    left: `-${(energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-[#F0C4B3] text-[#070504]"
                      : isRelated
                      ? "bg-[#F0C4B3]/50 text-[#070504]"
                      : "bg-[#0b0706] text-[#F0C4B3]"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-[#F0C4B3] shadow-lg shadow-[#F58F68]/40"
                      : isRelated
                      ? "border-[#F0C4B3] animate-pulse"
                      : "border-[#F0C4B3]/40"
                  }
                  transition-all duration-300 transform orbit-pop
                  ${isExpanded ? "scale-150" : ""}
                `}
                  style={{ animationDelay: `${index * 90 + 250}ms` }}
                >
                  <Icon size={16} />
                </div>

                <div
                  className={`
                  absolute left-1/2 -translate-x-1/2 whitespace-nowrap
                  ${narrow ? "top-11 text-[10px] font-medium tracking-normal" : "top-12 text-xs font-semibold tracking-wider"}
                  transition-all duration-300
                  ${isExpanded ? "text-white scale-125" : "text-white/70"}
                `}
                >
                  {narrow ? item.category : item.title}
                </div>

                {isExpanded && (
                  <Card
                    className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-[#0c0807]/90 backdrop-blur-lg border-white/30 shadow-xl shadow-white/10 overflow-visible orbit-card-in"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/50"></div>
                    <button
                      type="button"
                      aria-label={`Close ${item.title}`}
                      className="absolute top-1.5 right-1.5 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        closeAll();
                      }}
                    >
                      <X size={14} />
                    </button>
                    <CardHeader className="pb-3">
                      {(item.status || item.date) && (
                        <div className="flex justify-between items-center">
                          {item.status && (
                            <Badge
                              className={`px-2 text-xs ${getStatusStyles(
                                item.status
                              )}`}
                            >
                              {item.status === "completed"
                                ? "COMPLETE"
                                : item.status === "in-progress"
                                ? "IN PROGRESS"
                                : "PENDING"}
                            </Badge>
                          )}
                          {item.date && (
                            <span className="text-xs font-mono text-white/50">
                              {item.date}
                            </span>
                          )}
                        </div>
                      )}
                      <CardTitle className="text-sm mt-2 pr-7 text-white">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <div className="mx-6 h-px bg-white/15"></div>
                    <CardContent className="pt-3 text-xs text-white/80">
                      <p>{item.content}</p>

                      {item.energy !== undefined && (
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <div className="flex justify-between items-center text-xs mb-1">
                            <span className="flex items-center">
                              <Zap size={10} className="mr-1" />
                              Energy Level
                            </span>
                            <span className="font-mono">{item.energy}%</span>
                          </div>
                          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#F58F68] to-[#B4634D]"
                              style={{ width: `${item.energy}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-white/70 mr-1" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-white/70">
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-xs rounded-none border-white/20 bg-transparent hover:bg-white/10 text-white/80 hover:text-white transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className="ml-1 text-white/60"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
