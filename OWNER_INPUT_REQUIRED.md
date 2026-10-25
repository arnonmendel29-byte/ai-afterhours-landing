# פרטים ואישורים הנדרשים מבעל העסק — לפני פרסום

השלימו את הסעיפים המסומנים. **אל תפרסמו** את האתר עם `[REQUIRES OWNER INPUT]` בעמודים הציבוריים — עדכנו `src/siteConfig.ts` וטקסטים במדיניות.

---

## 1. זהות משפטית וקשר

| שדה | סטטוס | פעולה |
|-----|--------|--------|
| שם משפטי של העסק | `[REQUIRES OWNER INPUT]` | `siteConfig.business.legalName` |
| מספר עוסק / ח.פ. | `[REQUIRES OWNER INPUT]` | `siteConfig.business.registrationNumber` |
| כתובת פיזית/משפטית | `[REQUIRES OWNER INPUT]` | `siteConfig.business.address` |
| אימייל לפניות פרטיות ונגישות | `[REQUIRES OWNER INPUT]` | `siteConfig.contact.email` |
| טלפון 054-4460533 | מופיע באתר | **אשרו** שזה המספר הרשמי ליצירת קשר |

---

## 2. WhatsApp (אי-התאמה לבריף)

בבריף צוין CTA ל-WhatsApp. **בקוד לא נמצא WhatsApp** — רק טופס וטלפון.

- [ ] האם CTA ראשי צריך להיות WhatsApp?
- [ ] אם כן — ספקו קישור מאומת (`https://wa.me/972...?text=...`) ללא PII ב-URL
- [ ] עדכון: `siteConfig.whatsAppUrl`
- [ ] אישור ש-Meta/WhatsApp מעבדים את השיחה (גילוי במדיניות פרטיות)

---

## 3. טופס הדגמה

- [ ] בחרו ספק שליחה (Formspree, Make, CRM, API עצמי)
- [ ] הגדירו `VITE_FORM_ACTION_URL` ב-Vercel (Environment Variables) ל-Production
- [ ] חתמו על הסכם עיבוד מידע עם הספק אם נדרש
- [ ] בדקו שליחה אמיתית אחרי Deploy

---

## 4. דומיין ו-SEO

- [x] דומיין סופי: `https://kolid.co.il` — עודכנו `canonical`, `sitemap.xml`, `siteConfig.siteUrl`, `public/schema.json`, `robots.txt`, `index.html`
- [ ] אימות Google Search Console / Rich Results ל-JSON-LD

---

## 5. נכסים וטענות

- [ ] רישיון/זכויות לתמונות (`hero-robot`, `niv-ashour`)
- [ ] רישיון Rubik (Google Fonts — SIL Open Font; אימות שימוש מסחרי)
- [ ] אימות שמות אינטגרציות (`content.ts` — TODO קיים)
- [ ] אימות טענות שיווקיות (24/7, יכולות AI)

---

## 6. נגישות ומשפט

- [ ] האם העסק זכאי לפטור מנגישות? (ייעוץ משפטי — **לא** מסקנה אוטומטית)
- [ ] מינוי רכז/ת נגישות — אם נדרש
- [ ] ייעוץ משפטי לגבי תיקון 13 / מדיניות פרטיות סופית

---

## 7. Vercel (גישה ללוח הבקרה)

- [ ] וידוא ש-**Vercel Web Analytics / Speed Insights** כבויים — אם לא רוצים מעקב
- [ ] בדיקת Environment Variables — אין סודות ב-`VITE_*` שאינם ציבוריים
- [ ] החלפת `VERCEL_TOKEN` אם דלף (לא זוהה דליפה בקוד)
