# Zmiany projektu

## Fundament aplikacji

### 2026-09-18 — M1-T1 / Feature-first i alias importów

Przeniesiono składanie aplikacji do `src/core`, ekran do `src/features/home`, dodano używany alias `@/*` i tekst „Terminie / Projekt gotowy”. Zachowano strict oraz zależności. Typecheck, lint, bundlowanie i build Android przeszły; zweryfikowano ekran na emulatorze. Pełny wpis i ograniczenia: [docs/Zmiany.md](docs/Zmiany.md).

## Bootstrap i dokumentacja

### 2026-09-18 — T0.1 / Wybór urządzenia przed instalacją

Skrypt Android wymaga teraz jawnego wyboru urządzenia. Zapobiega automatycznemu kierowaniu instalacji na przepełniony emulator; zaktualizowano README i szczegółowy dziennik.

### 2026-09-18 — T0.1 / Osobny emulator

Przygotowano lokalny emulator Termino z partycją 12 GB, zachowując dane dotychczasowego AVD. Uzupełniono README i [docs/Zmiany.md](docs/Zmiany.md) o wybór urządzenia.

### 2026-09-18 — T0.1 / Naprawa konfiguracji lokalnego SDK

Zapisano lokalną ścieżkę SDK dla Gradle i uzupełniono instrukcję utrzymania konfiguracji po ponownym otwarciu terminala lub regeneracji projektu natywnego. Szczegóły w [docs/Zmiany.md](docs/Zmiany.md).

### 2026-09-18 — T0.1 / Inicjalizacja

Utworzono bootstrap Termino, ekran startowy, narzędzia jakości oraz dokumentację. Szczegółowy dziennik implementacji: [docs/Zmiany.md](docs/Zmiany.md). Kolejne taski aktualizują ten dziennik; przy wysyłaniu kodu do repozytorium aktualizujemy również ten indeks wymagany przez zasady projektu.
