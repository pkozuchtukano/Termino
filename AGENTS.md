# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

## Termino

- Dokumentacja po polsku, UTF-8. Plan: `docs/Plan.md`, zaakceptowane decyzje: `docs/Architektura.md`.
- Każdy task aktualizuje `docs/Zmiany.md`; przed wysłaniem kodu do repozytorium również główny `Zmiany.md`.
- Podstawowe operacje projektuj offline-first. Domena niezależna od Androida i SDK integracji.
- Dane zachowujemy: zmiany bazy wyłącznie przez bezstratne migracje.
- Dodawaj zależności i warstwy dopiero dla realizowanego zakresu. Nie implementuj kolejnych tasków bez zlecenia.
