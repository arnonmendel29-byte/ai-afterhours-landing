# דוח ביקורת טכנית — קוליד (num8)

**תאריך:** 2026-10-09  
**מסגרת:** Vite 7 + React 19 (SPA), אירוח Vercel  
**היקף:** קוד במאגר, הגדרות vercel.json, בדיקת תלויות, סקירת נגישות בקוד, בדיקה מוגבלת בדפדפן מקומי

> דוח זה **אינו** תחליף לייעוץ משפטי, ביקורת אבטחה חיצונית (Pen Test) או ביקורת נגישות מקצועית מלאה.

---

## סיכום מנהלים

| חומרה | כמות (לפני תיקון) | מצב לאחר עבודה זו |
|--------|-------------------|-------------------|
| גבוהה | 3 | 2 תוקנו בקוד; 1 דורש החלטת בעל עסק (WhatsApp / טופס) |
| בינונית | 6 | רובם טופלו או תועדו |
| נמוכה | 5 | תועדו |

---

## ממצאים מפורטים

### 1. טופס הדגמה — אין Backend (גבוהה)

| | |
|---|---|
| **ראיה** | `LandingApp.tsx` — `preventDefault` בלבד; לא היה `action` / `fetch` |
| **סיכון** | משתמשים חושבים שנשלח מידע; איסוף PII ללא עיבוד מוגדר — חוסר שקיפות ופרטיות |
| **תיקון** | הודעת סטטוס ברורה כשאין `VITE_FORM_ACTION_URL`; קישור למדיניות פרטיות; תמיכה אופציונלית ב-POST ל-URL מ-env |
| **נותר** | בעל עסק חייב להגדיר endpoint מאובטח (Formspree, Make, API) ו-DPA עם ספק |

### 2. אי-התאמה בין בריף ל-CTA (גבוהה — עסקי)

| | |
|---|---|
| **ראיה** | אין `wa.me`, `whatsapp` או קישור WhatsApp בקוד; CTA מוביל ל-`#demo-form` |
| **סיכון** | זרימת המרה שגויה; מדיניות פרטיות לא תתאים ל-WhatsApp עד לאימות |
| **תיקון** | `siteConfig.whatsAppUrl` — null עד לאימות; תיעוד ב-OWNER_INPUT_REQUIRED |
| **נותר** | אימות מספר, טקסט פתיחה, והחלטה אם להחליף/להוסיף CTA |

### 3. חוסר כותרות אבטחה (בינוניה → טופל)

| | |
|---|---|
| **ראיה** | `vercel.json` — רק Cache-Control |
| **תיקון** | CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors |
| **לא נוסף** | HSTS — דורש אימות דומיין Production (ראו PRE_LAUNCH_CHECKLIST) |
| **אימות** | Headers ב-Production דרך DevTools / curl — **לא בוצע על Production במסגרת זו** |

### 4. מדיניות / נגישות / עוגיות — חסר (בינוניה → טופל)

| | |
|---|---|
| **תיקון** | עמודים `/privacy-policy`, `/accessibility`, `/cookie-policy` + קישורים ב-Footer |

### 5. Google Fonts — העברת IP ל-Google (בינונית — מידע)

| | |
|---|---|
| **ראיה** | `index.html` — fonts.googleapis.com, fonts.gstatic.com |
| **תיקון** | גילוי במדיניות פרטיות; הסרת inline `onload` לצורך CSP |
| **אופציונלי** | Self-host גופנים — הפחתת צד שלישי |

### 6. npm — חולשה ב-source-map-js (גבוהה → טופל)

| | |
|---|---|
| **ראיה** | `npm audit` — GHSA-68fv-2mgg-jv7q |
| **תיקון** | `npm audit fix` — 0 vulnerabilities לאחר תיקון |

### 7. Structured Data — קובץ חיצוני (נמוכה)

| | |
|---|---|
| **ראיה** | `/schema.json` נטען כ-`<script src>` |
| **סיכון** | ייתכן שחלק מכלי SEO מעדיפים JSON-LD inline |
| **פעולה** | אימות ב-Google Rich Results Test לאחר Deploy |

### 8. GitHub Actions — חשיפת מזהי Vercel (נמוכה)

| | |
|---|---|
| **ראיה** | `.github/workflows/deploy-vercel.yml` — `vercel-org-id`, `vercel-project-id` |
| **הערה** | לא סודות; עדיין מידע תשתיתי — לשקול GitHub Environments |

### 9. נגישות — פערים (בינוניה — שיפור חלקי)

| ממצא | תיקון |
|------|--------|
| אין skip link | נוסף |
| Focus לא עקבי | `:focus-visible` גלובלי |
| שדות טופס | `id`, `htmlFor`, `autocomplete` |
| Decorative `<i />` | `aria-hidden` |
| אנימציות Canvas / Framer | reduced motion חלקי — לא נבדק ידנית עם NVDA/JAWS |

### 10. Cookies / Analytics (מידע — ללא באנר)

| | |
|---|---|
| **בדיקה** | אין GA/Pixel בקוד; אין `document.cookie` / storage למעקב |
| **מסקנה** | **לא** נוסף באנר הסכמה — ראו `/cookie-policy` |
| **מגבלה** | Vercel Analytics / Speed Insights בלוח הבקרה — **לא נבדק** |

### 11. `.env` (טוב)

| | |
|---|---|
| **ראיה** | `.gitignore` כולל `.env`, `.env.*` |
| **תיקון** | נוסף `.env.example` |

### 12. CSP ו-`form-action` (מידע)

| | |
|---|---|
| **הגדרה** | `form-action 'self' https:` — מאפשר POST לספק טופס חיצוני כשיוגדר |

---

## מה לא נבדק

- לוח בקרה Vercel (Analytics, Domains, Env Vars, Firewall)
- Headers ב-Production לאחר Deploy
- Penetration testing
- ביקורת נגישות ידנית מלאה (WCAG AA)
- תאימות משפטית סופית (תיקון 13, תקנות אבטחת מידע)
- רישיונות תמונות/פונטים — רשימת אימות לבעל עסק

---

## קבצים שנוצרו/שונו במסגרת התיקון

ראו סיכום המסירה בצ'אט ו-PRE_LAUNCH_CHECKLIST.md.
