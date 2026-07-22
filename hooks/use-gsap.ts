"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function ensureGsapRegistered() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useGsapContext<T extends HTMLElement = HTMLDivElement>(
  callback: () => void,
  deps: React.DependencyList = [],
  externalRef?: React.RefObject<T | null>
) {
  const internalRef = useRef<T | null>(null);
  const scopeRef = externalRef || internalRef;

  useEffect(() => {
    ensureGsapRegistered();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(callback, scopeRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}
