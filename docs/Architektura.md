# Termino — architektura i decyzje

## Model domenowy — M1-T3

- Czyste typy w `src/features/documents/domain/types.ts`, bez zależności od UI, platformy, bazy i SDK. Relacja **Document 1:N Deadline** przez `Deadline.documentId` wskazujące `Document.id`.
- Rdzeń Termino to **Deadline.actionTitle + Deadline.dueDate**: konkretna akcja i jej termin. `Document.eventDate` to drugorzędna data zdarzenia źródłowego, np. zakupu, wystawienia faktury lub podpisania umowy.
- `eventDate` i `dueDate`: lekki alias `DateOnly` (`string`, format `YYYY-MM-DD`, bez czasu i timezone). `createdAt`, `updatedAt`, `completedAt`: `Timestamp` (`string`, ISO 8601 w UTC). Aliasy nie walidują wartości w runtime.
- Status terminu: wyłącznie `active`, `completed`, `cancelled`; `completedAt` jest opcjonalne. `overdue` i `urgent` będą wyliczane z `dueDate` i bieżącej daty, nie przechowywane. Reguły przejść statusów i próg pilności pozostają poza M1-T3.
- `sourceType`: `camera | gallery | file | manual`. `category?: string` jest elastyczną wartością/identyfikatorem; `localFileUri?: string` wskazuje opcjonalny plik lokalny.
- M1-T3 aktualizuje zakres ADR-005/008/009 poniżej: strony i osobna encja kategorii pozostają kierunkiem przyszłego rozwoju; aktualny model ma opcjonalne `localFileUri` i `category`. Kwota nie należy do rdzenia — ewentualnie trafi do opcjonalnych metadata. Nie dodano tych rozszerzeń ani persistencji.

## Fundament i nawigacja — stan M1-T2

Wdrożone: React Native 0.86.3, React 19.2.3, Expo 57 / Dev Client, TypeScript strict, React Navigation 7, npm z lockfile, ESLint i Prettier. Trzy ekrany renderują lokalne placeholdery; brak store, bazy i wywołań sieciowych aplikacji. Metro/Babel korzystają z domyślnych ustawień Expo; brak test runnera.

Root Stack (`native-stack`): `Main` → Main App Shell oraz osobne `AddDocument`. Shell (`bottom-tabs`) ma sekcje `Documents` i `Settings`, z widocznymi etykietami „Dokumenty” i „Ustawienia”. Centralna akcja „Skanuj” w dolnym pasku każdej sekcji otwiera flow dodawania ponad tabami; Android Back zdejmuje tę trasę i przywraca sekcję. Brak dodatkowych kroków flow. Start: `Main/Documents`; brak persistencji nawigacji i konfiguracji deep linków.

Typy tras: `src/core/navigation/types.ts`. `SafeAreaProvider` otacza kontener nawigacji; Root Stack obsługuje nagłówek AddDocument, własny prosty pasek tabów korzysta z insets React Navigation, a wspólny `SpatialScreen` chroni treść przy krawędziach i umożliwia przewijanie. Nie dodano biblioteki ikon. Android z Expo już odrzuca odtwarzanie stanu Activity (`super.onCreate(null)`); nowe natywne moduły podłącza autolinking, wymagany rebuild Dev Client.

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

## Organizacja kodu — M1-T2

- `index.ts`: `registerRootComponent` Expo; `src/core/App.tsx`: providery; `src/core/navigation`: Root Stack, Main App Shell i typy.
- Feature-first: `documents`, `add-document`, `settings` zawierają po jednym ekranie; od M1-T3 `documents/domain/types.ts` zawiera model dokumentu i terminów. `shared/components/SpatialScreen` i `SpatialCard` są używane przez wszystkie trzy. Typowane tokeny i motyw nawigacji: `shared/theme`; zasady UI: [DesignSystem.md](DesignSystem.md). Usunięto nieużywany `home`. Bez pustych warstw repozytoriów, domeny lub usług.
- Alias `@/*` → `src/*` jest zdefiniowany w `tsconfig.json` i używany w entry oraz App. Expo Metro natywnie odczytuje `paths`; nie dodajemy resolvera Babel ani `baseUrl`. Po zmianie aliasów należy zrestartować Metro.
- UI wywołuje przypadki użycia; domena nie importuje SDK integracji. Adaptery realizują kontrakty wymagane przez domenę/przypadki użycia.
- Native `android/` generuje Expo Prebuild (CNG); nie wersjonujemy go. Trwałe zmiany natywne zapisujemy w konfiguracji Expo/pluginach.
- `com.termino.app` to roboczy identyfikator lokalnego development buildu, do zatwierdzenia przed dystrybucją. Nie przesądza własności domeny ani nazwy w sklepie.
- Nazwa wyświetlana od M1-T1: „Termino”. Techniczne `slug`, nazwa pakietu npm i applicationId pozostają bez zmian; aktualizacja nie tworzy osobnej aplikacji ani nie usuwa danych. Historyczne ADR-y i nazwa planowanego backupu pozostają zachowane.
- Nowe zależności dopiero w tasku, który ich używa. Zmiany bazy wyłącznie przez bezstratne migracje.

## Warianty startu

Wybrano pusty szablon TypeScript + Dev Client: mało zależności, prosty build, możliwość rozwoju natywnego. Bare React Native daje pełną kontrolę natywną, ale zwiększa utrzymanie konfiguracji; brak takiej potrzeby w T0.1. Rozbudowany szablon z routerem dodałby zbędną nawigację dla jednego ekranu. Koszt późniejszego dodania warstw/routera jest lokalny; nie ma teraz danych do migracji. Zgodność WatermelonDB, ML Kit i Notifee z wersją RN wymaga odrębnej walidacji w ich taskach.

Podstawa konfiguracji: [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/) i [Dev Client](https://docs.expo.dev/versions/v57.0.0/sdk/dev-client/).
