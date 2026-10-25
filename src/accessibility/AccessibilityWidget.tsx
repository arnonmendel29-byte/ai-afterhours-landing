import { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  applyA11yPrefs,
  defaultA11yPrefs,
  loadA11yPrefs,
  saveA11yPrefs,
  type A11yPrefs,
} from './a11yPreferences';
import { WheelchairIcon } from './WheelchairIcon';
import './AccessibilityWidget.css';

function ScalePicker({
  id,
  label,
  value,
  labels,
  onChange,
}: {
  id: string;
  label: string;
  value: 0 | 1 | 2;
  labels: [string, string, string];
  onChange: (next: 0 | 1 | 2) => void;
}) {
  return (
    <div className="a11y-widget__group">
      <span className="a11y-widget__label" id={id}>
        {label}
      </span>
      <div className="a11y-widget__row" role="group" aria-labelledby={id}>
        {([0, 1, 2] as const).map((level) => (
          <button
            key={level}
            type="button"
            className="a11y-widget__chip"
            aria-pressed={value === level}
            onClick={() => onChange(level)}
          >
            {labels[level]}
          </button>
        ))}
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="a11y-widget__switch">
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
    </label>
  );
}

export function AccessibilityWidget() {
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<A11yPrefs>(() => loadA11yPrefs());

  useEffect(() => {
    applyA11yPrefs(prefs);
    saveA11yPrefs(prefs);
  }, [prefs]);

  const update = useCallback((patch: Partial<A11yPrefs>) => {
    setPrefs((current) => ({ ...current, ...patch }));
  }, []);

  const reset = useCallback(() => {
    setPrefs(defaultA11yPrefs);
  }, []);

  const skipToContent = useCallback(() => {
    const target =
      document.getElementById('main-content') ?? document.getElementById('legal-main');
    target?.focus();
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    const onPointerDown = (event: MouseEvent) => {
      const node = event.target as Node;
      if (panelRef.current?.contains(node) || toggleRef.current?.contains(node)) return;
      setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    panelRef.current?.querySelector<HTMLElement>('button, a, input')?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [open]);

  return (
    <div className="a11y-widget">
      <button
        ref={toggleRef}
        type="button"
        className="a11y-widget__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        aria-label="פתיחת תפריט נגישות לאנשים עם מוגבלות"
        title="נגישות"
        onClick={() => setOpen((value) => !value)}
      >
        <WheelchairIcon className="a11y-widget__icon" />
      </button>

      <div
        ref={panelRef}
        id={panelId}
        className="a11y-widget__panel"
        role="dialog"
        aria-modal="false"
        aria-labelledby={`${panelId}-title`}
        hidden={!open}
      >
        <div className="a11y-widget__panel-head">
          <h2 className="a11y-widget__title" id={`${panelId}-title`}>
            התאמות נגישות
          </h2>
          <button
            type="button"
            className="a11y-widget__close"
            aria-label="סגירת תפריט נגישות"
            onClick={() => {
              setOpen(false);
              toggleRef.current?.focus();
            }}
          >
            ×
          </button>
        </div>
        <p className="a11y-widget__intro">
          ההגדרות נשמרות במכשיר שלך בלבד (localStorage) ואינן משמשות למעקב.
        </p>

        <p className="a11y-widget__section-label">תצוגה וקריאות</p>
        <ScalePicker
          id={`${panelId}-font`}
          label="גודל טקסט"
          value={prefs.fontScale}
          labels={['רגיל', 'גדול', 'גדול מאוד']}
          onChange={(fontScale) => update({ fontScale })}
        />
        <ScalePicker
          id={`${panelId}-line`}
          label="ריווח בין שורות"
          value={prefs.lineSpacing}
          labels={['רגיל', 'רחב', 'רחב מאוד']}
          onChange={(lineSpacing) => update({ lineSpacing })}
        />
        <ToggleRow
          label="גופן קריא (sans-serif מערכת)"
          checked={prefs.readableFont}
          onChange={(readableFont) => update({ readableFont })}
        />

        <p className="a11y-widget__section-label">ניגודיות וצבע</p>
        <ToggleRow
          label="ניגודיות גבוהה"
          checked={prefs.highContrast}
          onChange={(highContrast) => update({ highContrast })}
        />
        <ToggleRow
          label="גווני אפור (הסרת צבע)"
          checked={prefs.grayscale}
          onChange={(grayscale) => update({ grayscale })}
        />

        <p className="a11y-widget__section-label">ניווט והדגשות</p>
        <ToggleRow
          label="הדגשת קישורים (קו תחתון)"
          checked={prefs.linkUnderline}
          onChange={(linkUnderline) => update({ linkUnderline })}
        />
        <ToggleRow
          label="הדגשת מיקוד מקלדת (focus)"
          checked={prefs.strongFocus}
          onChange={(strongFocus) => update({ strongFocus })}
        />
        <button type="button" className="a11y-widget__action" onClick={skipToContent}>
          דילוג לתוכן הראשי
        </button>

        <p className="a11y-widget__section-label">תנועה</p>
        <ToggleRow
          label="עצירת אנימציות ותנועה"
          checked={prefs.reduceMotion}
          onChange={(reduceMotion) => update({ reduceMotion })}
        />

        <div className="a11y-widget__footer">
          <button type="button" className="a11y-widget__chip" onClick={reset}>
            איפוס הכל
          </button>
          <a href="/accessibility/">הצהרת נגישות מלאה</a>
        </div>
      </div>
    </div>
  );
}
