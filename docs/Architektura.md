# Terminie — architektura i decyzje

## Stan M1-T1

Wdrożone: React Native 0.86.3, React 19.2.3, Expo 57 / Dev Client, TypeScript strict, npm z lockfile, ESLint i Prettier. Ekran „Terminie / Projekt gotowy” renderuje wyłącznie lokalny tekst. Brak nawigacji, store, bazy i wywołań sieciowych aplikacji. Metro/Babel korzystają z domyślnych ustawień Expo; brak test runnera.

Planowane: WatermelonDB / SQLite, ML Kit OCR, Notifee, Google Drive API i opcjonalna integracja Google Calendar zgodnie z bazowym planem. Nie są zainstalowane ani zaimplementowane. Offline-first: przyszłe dane trwałe i reguły biznesowe działają lokalnie, integracje nie blokują operacji. Dev Client potrzebuje lokalnego Metro do pobrania kodu; nie jest samodzielnym buildem produkcyjnym.

Status poniższych ADR: **zaakceptowane**, data: **2026-09-18**. Decyzje opisują kierunek; T0.1 nie implementuje modułów biznesowych.

| ADR     | Decyzja i skutek                                                                                                                                                                    |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ADR-001 | Android-first MVP. iOS poza bieżącym zakresem; domena bez zbędnych zależności od platformy.                                                                                         |
| ADR-002 | Expo Custom Development Build / Dev Client zamiast Expo Go, preferowane na start wobec Bare React Native. Umożliwia własne moduły natywne; ich zmiana wymaga przebudowania klienta. |
| ADR-003 | Offline-first. Podstawowe funkcje działają bez internetu; integracje nie blokują operacji lokalnych.                                                                                |
| ADR-004 | Lokalna baza jest źródłem prawdy. Drive, Calendar i system powiadomień są adapterami/integracjami.                                                                                  |
| ADR-005 | Dokument może mieć wiele stron; ścieżki plików należą do DocumentPage, nie pojedynczego LocalImagePath dokumentu.                                                                   |
| ADR-006 | OCR nie blokuje utworzenia dokumentu; zawsze dostępne ręczne wprowadzanie.                                                                                                          |
| ADR-007 | Parser zwraca sugestie wymagające zatwierdzenia przez użytkownika.                                                                                                                  |
| ADR-008 | Kategorie są osobnymi encjami, nie wyłącznie tekstem w dokumencie.                                                                                                                  |
| ADR-009 | Kwoty docelowo jako integer minor units + kod waluty; bez zmiennoprzecinkowych wartości pieniężnych.                                                                                |
| ADR-010 | Daty biznesowe jako YYYY-MM-DD, timestampy techniczne w UTC.                                                                                                                        |
| ADR-011 | Folder backupu Google Drive: „Termino Backup”.                                                                                                                                      |
| ADR-012 | Notifee obsługuje lokalne przypomnienia; Google Calendar jest opcjonalną integracją kalendarza. Żaden nie jest źródłem prawdy dla terminu dokumentu.                                |
| ADR-013 | Google Calendar należy do MVP; osobny moduł po utworzeniu stabilnego modelu domenowego.                                                                                             |

## Organizacja kodu — M1-T1

- `index.ts`: `registerRootComponent` Expo; `src/core/App.tsx`: składanie aplikacji; `src/features/home/HomeScreen.tsx`: obecny ekran.
- Feature-first: kod konkretnej funkcjonalności trafia do `src/features/<feature>`. `documents` i `settings` powstaną dopiero przy ich implementacji. `core` zawiera inicjalizację i przyszłą konfigurację aplikacji; `shared` powstanie dla faktycznie współdzielonych elementów, bez zależności od feature'ów. Nie tworzymy pustych katalogów ani warstw na zapas.
- Alias `@/*` → `src/*` jest zdefiniowany w `tsconfig.json` i używany w entry oraz App. Expo Metro natywnie odczytuje `paths`; nie dodajemy resolvera Babel ani `baseUrl`. Po zmianie aliasów należy zrestartować Metro.
- UI wywołuje przypadki użycia; domena nie importuje SDK integracji. Adaptery realizują kontrakty wymagane przez domenę/przypadki użycia.
- Native `android/` generuje Expo Prebuild (CNG); nie wersjonujemy go. Trwałe zmiany natywne zapisujemy w konfiguracji Expo/pluginach.
- `com.termino.app` to roboczy identyfikator lokalnego development buildu, do zatwierdzenia przed dystrybucją. Nie przesądza własności domeny ani nazwy w sklepie.
- Nazwa wyświetlana od M1-T1: „Terminie”. Techniczne `slug`, nazwa pakietu npm i applicationId pozostają bez zmian; aktualizacja nie tworzy osobnej aplikacji ani nie usuwa danych. Historyczne ADR-y i nazwa planowanego backupu pozostają zachowane.
- Nowe zależności dopiero w tasku, który ich używa. Zmiany bazy wyłącznie przez bezstratne migracje.

## Warianty startu

Wybrano pusty szablon TypeScript + Dev Client: mało zależności, prosty build, możliwość rozwoju natywnego. Bare React Native daje pełną kontrolę natywną, ale zwiększa utrzymanie konfiguracji; brak takiej potrzeby w T0.1. Rozbudowany szablon z routerem dodałby zbędną nawigację dla jednego ekranu. Koszt późniejszego dodania warstw/routera jest lokalny; nie ma teraz danych do migracji. Zgodność WatermelonDB, ML Kit i Notifee z wersją RN wymaga odrębnej walidacji w ich taskach.

Podstawa konfiguracji: [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/) i [Dev Client](https://docs.expo.dev/versions/v57.0.0/sdk/dev-client/).
