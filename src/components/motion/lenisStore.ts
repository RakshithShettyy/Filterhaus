export type LenisLike = {
  on: (event: "scroll", callback: () => void) => void;
  off: (event: "scroll", callback: () => void) => void;
  scrollTo: (
    target: HTMLElement | string | number,
    options?: { offset?: number; immediate?: boolean },
  ) => void;
  stop: () => void;
  start: () => void;
  raf: (time: number) => void;
  destroy: () => void;
};

let current: LenisLike | null = null;

export function setLenis(instance: LenisLike | null) {
  current = instance;
}

export function getLenis() {
  return current;
}
