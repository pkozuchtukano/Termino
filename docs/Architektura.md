# Termino — decyzje architektoniczne

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

## Organizacja kodu — T0.1

- `index.ts`: rejestracja aplikacji; `src/app/App.tsx`: składanie UI; `src/screens/HomeScreen.tsx`: ekran startowy.
- Kolejne warstwy tworzymy dopiero z rzeczywistym kodem: `domain` (typy/reguły bez React Native), `data` (repozytoria), `services` (przypadki użycia), `infrastructure` (baza i adaptery), `components` (wspólne UI), `utils` (wspólne funkcje), `navigation` (po dodaniu kolejnych ekranów).
- UI wywołuje przypadki użycia; domena nie importuje SDK integracji. Adaptery realizują kontrakty wymagane przez domenę/przypadki użycia.
- Native `android/` generuje Expo Prebuild (CNG); nie wersjonujemy go. Trwałe zmiany natywne zapisujemy w konfiguracji Expo/pluginach.
- `com.termino.app` to roboczy identyfikator lokalnego development buildu, do zatwierdzenia przed dystrybucją. Nie przesądza własności domeny ani nazwy w sklepie.
- Nowe zależności dopiero w tasku, który ich używa. Zmiany bazy wyłącznie przez bezstratne migracje.

## Warianty startu

Wybrano pusty szablon TypeScript + Dev Client: mało zależności, prosty build, możliwość rozwoju natywnego. Bare React Native daje pełną kontrolę natywną, ale zwiększa utrzymanie konfiguracji; brak takiej potrzeby w T0.1. Rozbudowany szablon z routerem dodałby zbędną nawigację dla jednego ekranu. Koszt późniejszego dodania warstw/routera jest lokalny; nie ma teraz danych do migracji. Zgodność WatermelonDB, ML Kit i Notifee z wersją RN wymaga odrębnej walidacji w ich taskach.

Podstawa konfiguracji: [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/) i [Dev Client](https://docs.expo.dev/versions/v57.0.0/sdk/dev-client/).
