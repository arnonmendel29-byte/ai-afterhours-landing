# רשימת פעולות לפני פרסום — קוליד

---

## תוקן ונבדק (בסביבת פיתוח)

- [x] דוח ביקורת (`AUDIT_REPORT.md`)
- [x] עמודי מדיניות: `/privacy-policy`, `/accessibility`, `/cookie-policy`
- [x] קישורי Footer לעמודים משפטיים
- [x] שקיפות טופס — הודעה כשאין backend; תמיכה ב-`VITE_FORM_ACTION_URL`
- [x] skip link + `main#main-content`
- [x] שיפור focus, תוויות טופס, `tel:` לטלפון
- [x] CSP ו-headers ב-`vercel.json` (בקוד)
- [x] SPA rewrites לנתיבי מדיניות
- [x] `npm audit fix` — 0 vulnerabilities
- [x] `npm run build` — **הריצו שוב לאחר שינויים אחרונים**
- [x] אין באנר עוגיות — מתועד ב-cookie-policy

---

## תוקן אך דורש אימות ב-Production

- [ ] Headers (CSP, Referrer-Policy…) — `curl -I https://<domain>/`
- [ ] `/privacy-policy`, `/accessibility`, `/cookie-policy` נטענים ב-Domain האמיתי
- [ ] טופס — שליחה עם `VITE_FORM_ACTION_URL` ב-Production
- [ ] JSON-LD — Rich Results Test
- [ ] אין שגיאות Console קריטיות בדפדפן Production
- [ ] CSP לא חוסם גופנים/סקריפטים (בדיקת Network)

---

## ממתין לבעל העסק

- [ ] השלמת `src/siteConfig.ts` (אימייל, שם משפטי, כתובת)
- [ ] החלטה WhatsApp vs טופס — ראו `OWNER_INPUT_REQUIRED.md`
- [ ] endpoint טופס + משתנה סביבה ב-Vercel
- [ ] דומיין סופי ועדכון canonical/sitemap
- [ ] אימות טלפון וטענות 24/7
- [ ] רישיונות תמונות ותוכן

---

## ממתין לאיש מקצוע

- [ ] ייעוץ משפטי — פרטיות (תיקון 13), הצהרות במדיניות
- [ ] ביקורת נגישות ידנית (קורא מסך, WCAG AA)
- [ ] ייעוץ נגישות — פטור/חובה לפי גודל העסק

---

## Vercel — ידני בלוח הבקרה

- [ ] **לא** הופעל Deploy אוטומטי מצ'אט זה
- [ ] בדיקת Analytics / Speed Insights — כבוי אם לא נדרש
- [ ] HSTS: **לא** נוסף ב-vercel.json — לפני הפעלה: וודאו HTTPS על כל subdomains
- [ ] Preview URLs — הגבלת גישה אם יש מידע רגיש
- [ ] `VITE_FORM_ACTION_URL` רק ל-Production/Preview לפי צורך

---

## לא ניתן לבדוק מהמאגר בלבד

- [ ] הגדרות Firewall / WAF ב-Vercel
- [ ] לוגים ושמירת IP ב-Vercel
- [ ] התנהגות Cookies ב-Production (DevTools Application)
- [ ] Pen test / DAST

---

## בדיקות שבוצעו / לא בוצעו

| בדיקה | סטטוס |
|--------|--------|
| TypeScript `tsc --noEmit` | יש להריץ אחרי build |
| `npm run build` | יש להריץ |
| npm audit | עבר (0 vulns) |
| Lint ייעודי | **אין** סקריפט lint בפרויקט |
| נגישות ידנית מלאה | **לא** |
| Production headers | **לא** |
| WhatsApp | **לא קיים בקוד** |
