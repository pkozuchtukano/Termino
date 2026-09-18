# Terminie — Spatial Productivity

Source of truth: tokeny w `src/shared/theme/index.ts`; zmiany wartości aktualizują też ten dokument.

| Token            | Wartość |
| ---------------- | ------- |
| background       | #090A0F |
| surface          | #12151E |
| border           | #1E2433 |
| primary          | #6366F1 |
| warning          | #F59E0B |
| textPrimary      | #F8FAFC |
| textSecondary    | #94A3B8 |
| cardRadius       | 20      |
| primaryCtaRadius | 30      |

Zasady: ciemne tło, oddzielone przestrzenią karty bento, subtelne obramowania i oszczędny akcent indygo. Muted Glassmorphism realizowany warstwami powierzchni, bez blur. Systemowa typografia, StyleSheet, czytelne etykiety; brak dekoracyjnych danych. Safe Area, przewijanie i zawijanie kart zamiast sztywnych wysokości ekranów.

## IMPLEMENTED NOW

- Dokumenty: nagłówek Terminie/Dokumenty, puste Najbliższe terminy i karty dokumentów.
- Ustawienia: informacyjny placeholder bez aktywnych ustawień.
- Dolny pasek: Dokumenty, centralna akcja Skanuj (min. 60 wysokości, subtelny cień), Ustawienia. Skanuj otwiera osobny AddDocument; nie jest tabem.
- AddDocument: ilustracja obszaru skanowania i informacja o niedostępności funkcji. Brak aparatu/importu/OCR.

## PLANNED LATER

- Document micro-card: ikona/logo, tytuł 1 linia, duża kwota, jedna data, kategoria, warning przy terminie ≤7 dni.
- OCR verification: podgląd + bounding boxes; panel z Datą, Kwotą, Kategorią i OCR suggestion chips.

Elementy planowane nie są zaimplementowane. Układ i dostępność wymagają manualnego smoke testu użytkownika.
