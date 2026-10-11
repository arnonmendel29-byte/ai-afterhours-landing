export type A11yPrefs = {
  fontScale: 0 | 1 | 2;
  lineSpacing: 0 | 1 | 2;
  highContrast: boolean;
  grayscale: boolean;
  reduceMotion: boolean;
  linkUnderline: boolean;
  strongFocus: boolean;
  readableFont: boolean;
};

export const A11Y_STORAGE_KEY = 'kolid-a11y-prefs';

export const defaultA11yPrefs: A11yPrefs = {
  fontScale: 0,
  lineSpacing: 0,
  highContrast: false,
  grayscale: false,
  reduceMotion: false,
  linkUnderline: false,
  strongFocus: false,
  readableFont: false,
};

const FONT_CLASSES = ['a11y-font-lg', 'a11y-font-xl'] as const;
const LINE_CLASSES = ['a11y-line-md', 'a11y-line-lg'] as const;
const TOGGLE_CLASSES = [
  'a11y-high-contrast',
  'a11y-grayscale',
  'a11y-reduce-motion',
  'a11y-link-underline',
  'a11y-strong-focus',
  'a11y-readable-font',
] as const;

function scaleLevel(value: unknown, max: number): 0 | 1 | 2 {
  const n = typeof value === 'number' ? value : Number(value);
  if (n >= 1 && n <= max) return n as 1 | 2;
  return 0;
}

export function loadA11yPrefs(): A11yPrefs {
  if (typeof window === 'undefined') return defaultA11yPrefs;
  try {
    const raw = localStorage.getItem(A11Y_STORAGE_KEY);
    if (!raw) return defaultA11yPrefs;
    const parsed = JSON.parse(raw) as Partial<A11yPrefs>;
    return {
      fontScale: scaleLevel(parsed.fontScale, 2),
      lineSpacing: scaleLevel(parsed.lineSpacing, 2),
      highContrast: Boolean(parsed.highContrast),
      grayscale: Boolean(parsed.grayscale),
      reduceMotion: Boolean(parsed.reduceMotion),
      linkUnderline: Boolean(parsed.linkUnderline),
      strongFocus: Boolean(parsed.strongFocus),
      readableFont: Boolean(parsed.readableFont),
    };
  } catch {
    return defaultA11yPrefs;
  }
}

export function saveA11yPrefs(prefs: A11yPrefs): void {
  localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(prefs));
}

export function applyA11yPrefs(prefs: A11yPrefs): void {
  const root = document.documentElement;
  root.classList.remove(...FONT_CLASSES, ...LINE_CLASSES, ...TOGGLE_CLASSES);
  if (prefs.fontScale === 1) root.classList.add('a11y-font-lg');
  if (prefs.fontScale === 2) root.classList.add('a11y-font-xl');
  if (prefs.lineSpacing === 1) root.classList.add('a11y-line-md');
  if (prefs.lineSpacing === 2) root.classList.add('a11y-line-lg');
  if (prefs.highContrast) root.classList.add('a11y-high-contrast');
  if (prefs.grayscale) root.classList.add('a11y-grayscale');
  if (prefs.reduceMotion) root.classList.add('a11y-reduce-motion');
  if (prefs.linkUnderline) root.classList.add('a11y-link-underline');
  if (prefs.strongFocus) root.classList.add('a11y-strong-focus');
  if (prefs.readableFont) root.classList.add('a11y-readable-font');
}
