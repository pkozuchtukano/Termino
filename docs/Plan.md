# Terminie — Plan produktu i architektury v0.1

Dokument jest planem bazowym, nie niezmiennym kontraktem. Kolejne decyzje mogą go modyfikować. Zaakceptowane zmiany architektoniczne zapisujemy w [Architektura.md](Architektura.md), a implementacyjne w [Zmiany.md](Zmiany.md). Każdy przyszły task aktualizuje dziennik zmian.

## 1. Architektura i stos

Terminie to aplikacja offline-first i serverless: podstawowa logika biznesowa działa lokalnie na urządzeniu, bez własnego backendu. Android jest platformą MVP; iOS pozostaje poza bieżącym zakresem. Domena nie powinna zależeć od Androida.

## Kolejność prac

- M1-T1 — fundament: zakończony 2026-09-18; strict, lint, format, eksport Metro, build Android i ekran na emulatorze zweryfikowane.
- M1-T2 — nawigacja i App Shell: zakończony 2026-09-18; walidacje statyczne, bundle, build Android oraz flow i Back na emulatorze offline zweryfikowane.
- M1-T3 — model domenowy dokumentu: planowane.
- M1-T4 — bootstrap WatermelonDB: planowane.
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

- Dokumenty wielostronicowe, strony, kategorie jako osobne encje, tagi, daty wystawienia i ważności, kwoty oraz gwarancje.
- Edycja, przeglądanie, wyszukiwanie obejmujące OCRText i filtrowanie.
- Kwoty: integer w najmniejszej jednostce waluty + osobny kod currency, np. PLN.
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

To kierunek rozwoju, nie ostateczny schemat SQL; schemat i migracje powstaną w osobnym tasku.

| Encja        | Planowana odpowiedzialność / pola                                                                                                |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| Document     | UUID, title, categoryId, issueDate, expiryDate, totalAmountMinor, currency, OCRText, status synchronizacji, createdAt, updatedAt |
| DocumentPage | UUID, documentId, pageNumber, localPath, zewnętrzny identyfikator pliku Drive po synchronizacji                                  |
| Category     | Osobna encja kategorii dokumentów                                                                                                |
| Tag          | Osobna encja etykiety                                                                                                            |
| DocumentTag  | Powiązanie dokumentu z tagiem                                                                                                    |

Model musi umożliwić powiązania z przypomnieniami, Drive i Calendar. Każda przyszła zmiana bazy wymaga bezstratnej migracji; nie usuwamy zapisanych danych podczas aktualizacji.

## 8. User flow

- **Dodanie:** skan → OCR → sugestie → korekta użytkownika → zapis lokalny → lokalne przypomnienia → opcjonalna synchronizacja Drive → opcjonalna synchronizacja Calendar. Przy błędzie OCR przejście do ręcznego wprowadzenia i zapisu.
- **Wyszukiwanie:** fraza użytkownika → wyszukiwanie również w OCRText → otwarcie dokumentu i jego skanu/stron.
- **Termin:** expiryDate → planowanie lokalnych przypomnień → opcjonalne utworzenie lub synchronizacja wydarzenia po włączeniu Google Calendar.

## 9. Storage

Pliki dokumentów trafiają do prywatnego storage aplikacji. Nie wymagamy MANAGE_EXTERNAL_STORAGE. Format docelowy (np. WebP/JPEG/PDF) zostanie zweryfikowany eksperymentalnie w osobnym tasku pipeline obrazu. Ścieżka pliku należy do strony dokumentu; nie zakładamy jednego LocalImagePath na dokument.
