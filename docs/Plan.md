# Termino — Plan produktu i architektury v0.1

Dokument jest planem bazowym, nie niezmiennym kontraktem. Kolejne decyzje mogą go modyfikować. Zaakceptowane zmiany architektoniczne zapisujemy w [Architektura.md](Architektura.md), a implementacyjne w [Zmiany.md](Zmiany.md). Każdy przyszły task aktualizuje dziennik zmian.

## 1. Architektura i stos

Termino to aplikacja offline-first i serverless: podstawowa logika biznesowa działa lokalnie na urządzeniu, bez własnego backendu. Android jest platformą MVP; iOS pozostaje poza bieżącym zakresem. Domena nie powinna zależeć od Androida.

## Kolejność prac

- M1-T1 — fundament: zakończony 2026-09-18; strict, lint, format, eksport Metro, build Android i ekran na emulatorze zweryfikowane.
- M1-T2 — Navigation + Spatial App Shell: implementacja gotowa 2026-09-18; walidacje automatyczne wykonane, manualny smoke test nowego UI oczekuje na użytkownika. Styl: [DesignSystem.md](DesignSystem.md).
- M1-T3 — model domenowy Document + Deadline: zakończony 2026-09-18 po walidacji typecheck i ESLint zmienionego pliku (0 ostrzeżeń). Bez testu UI.
- M1-T3a — samodzielne i powtarzalne terminy: zakończony 2026-09-18; opcjonalne `documentId` i `recurrence`, docelowe CTA „+ Dodaj” opisane bez zmiany UI. M1-T4 pozostaje następny.
- Następny task: M1-T4 — WatermelonDB bootstrap; planowany, nierozpoczęty.
- M1-T5 — pierwszy pionowy flow lokalnego dokumentu: planowane.
- Później: import/zdjęcia, OCR, Notifee, Google Drive; Calendar jako osobna integracja zgodnie z ADR-013.

Planowany stos: React Native, TypeScript, Expo Custom Development Build / Dev Client, WatermelonDB / SQLite, Google ML Kit Document Scanner API, Google ML Kit Text Recognition, Notifee, Google Drive REST API v3, Google Sign-In oraz Google Calendar jako pierwsza integracja kalendarza.

**Stan T0.1:** wyłącznie bootstrap Expo, ekran startowy, narzędzia jakości i dokumentacja. Baza, OCR, powiadomienia i integracje nie są jeszcze zaimplementowane ani dodane jako zależności. Kompatybilność przyszłych adapterów należy zweryfikować przed ich wdrożeniem.

## 2. Moduł 1 — przetwarzanie obrazu i OCR

- Skanowanie dokumentu, wykrywanie krawędzi, przetworzenie obrazu i lokalny zapis.
- OCR offline i ekstrakcja surowego tekstu; parsery dat, kwot i słów kluczowych; sugestie kategorii.
- Błąd OCR nie blokuje zapisu: użytkownik może ręcznie utworzyć dokument.
- Parser tworzy sugestie/draft wymagające korekty i zatwierdzenia przez użytkownika; nie zatwierdza danych automatycznie.

## 3. Moduł 2 — cykl życia dokumentu

- Document z opcjonalną kategorią i datą zdarzenia źródłowego `eventDate`; wiele terminów Deadline z konkretną akcją `actionTitle` i datą `dueDate`. Strony, osobne encje kategorii i tagi to przyszłe rozszerzenia.
- Edycja, przeglądanie, wyszukiwanie obejmujące OCRText i filtrowanie.
- Kwota nie należy do rdzenia Termino; jeśli będzie potrzebna, trafi do opcjonalnych metadata.
- Daty biznesowe: YYYY-MM-DD. Timestampy techniczne: UTC.

## 4. Moduł 3 — przypomnienia

- Lokalne przypomnienia domyślnie 30, 7 i 1 dzień przed terminem.
- Notifee jako adapter powiadomień systemowych; lokalna baza jako źródło prawdy dla terminów i odbudowania harmonogramu.
- Obsługa restartu urządzenia; testy ograniczeń Doze i producentów (OEM).
- Nie zakładamy obowiązkowego REQUEST_IGNORE_BATTERY_OPTIMIZATIONS. Decyzja wymaga testów oraz analizy wymagań dystrybucyjnych.

## 5. Moduł 4 — backup i synchronizacja Google Drive

- Google Sign-In i Google Drive REST API v3; folder aplikacji „Termino Backup”.
- Backup plików i metadanych, restore, lazy download obrazów.
- Synchronizacja offline-first: kolejka, retry i idempotency.
- Brak internetu nie blokuje podstawowych operacji. Lokalna baza jest źródłem bieżącego stanu; Drive jest adapterem backupu/synchronizacji.

## 6. Moduł 5 — integracja kalendarza

Google Calendar jest częścią MVP, wdrażaną jako osobny moduł po stabilizacji modelu domenowego.

- Opcjonalne połączenie konta/kalendarza Google.
- Tworzenie wydarzenia z terminu dokumentu i powiązanie lokalnego dokumentu z identyfikatorem zewnętrznego wydarzenia.
- Aktualizacja wydarzenia po zmianie daty, usunięcie lub anulowanie powiązania, ponowienie synchronizacji.
- Obsługa braku internetu oraz cofnięcia autoryzacji.

Termin istnieje lokalnie niezależnie od synchronizacji. Google Calendar jest adapterem, nie źródłem prawdy. Notifee odpowiada za lokalne, niezawodne przypomnienia (z uwzględnieniem ograniczeń systemu); Calendar za widoczność terminu i synchronizację pomiędzy urządzeniami poprzez Google. Awaria lub brak autoryzacji Calendar nie blokuje tworzenia/edycji dokumentu, zapisu terminu ani lokalnych przypomnień.

## 7. Wstępny model danych

Model domenowy M1-T3/M1-T3a nie jest schematem SQL; baza i migracje powstaną w osobnym tasku.

| Encja        | Planowana odpowiedzialność / pola                                                                                                |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| Document     | id, title, category?, eventDate?, sourceType, localFileUri?, createdAt, updatedAt |
| Deadline     | id, documentId?, actionTitle, dueDate, note?, recurrence?, status, completedAt?, createdAt, updatedAt |

Document ma 0..N Deadline; Deadline ma 0..1 Document przez opcjonalne `documentId` i może istnieć samodzielnie. Opcjonalne `recurrence` zawiera `frequency` (`daily | weekly | monthly | yearly`) oraz `interval` (dodatnia liczba całkowita, np. 2 + weekly = co 2 tygodnie). `dueDate` jest datą bazową/aktualnego wystąpienia; walidacja runtime i generator kolejnych wystąpień pozostają poza zakresem. `eventDate` oznacza drugorzędną datę zdarzenia źródłowego. Rdzeń: `actionTitle` + `dueDate`. Daty biznesowe są date-only (`YYYY-MM-DD`), techniczne to timestampy UTC. Statusy: `active`, `completed`, `cancelled`; `overdue` i `urgent` będą wyliczane z daty terminu i bieżącej daty. `sourceType`: `camera | gallery | file | manual`; kategoria jest elastycznym tekstem/identyfikatorem.

DocumentPage, Category, Tag i DocumentTag pozostają przyszłymi rozszerzeniami, poza M1-T3. Brak kwot, statusów OCR i synchronizacji w rdzeniu.

Model musi umożliwić powiązania z przypomnieniami, Drive i Calendar. Każda przyszła zmiana bazy wymaga bezstratnej migracji; nie usuwamy zapisanych danych podczas aktualizacji.

## 8. User flow

- **Dodanie:** „+ Dodaj” → równorzędny wybór: „Dodaj termin ręcznie” (Co zrobić?, Termin, opcjonalne Powtarzanie i Notatka; bez dokumentu) albo „Skanuj dokument” (skan → OCR → sugestie → korekta użytkownika) → zapis lokalny. Skanowanie jest opcjonalne; błąd OCR nie blokuje ręcznego zapisu. Przypomnienia i opcjonalne integracje pozostają kolejnymi etapami planu.
- **Wyszukiwanie:** fraza użytkownika → wyszukiwanie również w OCRText → otwarcie dokumentu i jego skanu/stron.
- **Termin:** Deadline (`actionTitle` + `dueDate`) → planowanie lokalnych przypomnień → opcjonalne utworzenie lub synchronizacja wydarzenia po włączeniu Google Calendar.

## 9. Storage

Pliki dokumentów docelowo trafiają do prywatnego storage aplikacji. Nie wymagamy MANAGE_EXTERNAL_STORAGE. Format docelowy (np. WebP/JPEG/PDF) zostanie zweryfikowany eksperymentalnie w osobnym tasku pipeline obrazu. M1-T3 definiuje opcjonalne `Document.localFileUri`; obsługa wielu stron i ich ścieżek pozostaje przyszłym rozszerzeniem.
