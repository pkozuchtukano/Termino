# Termino — Dark Spatial UI

Ten dokument jest źródłem prawdy dla wyglądu Termino. Implementacja tokenów: src/shared/theme/index.ts. Zmiana stylu wymaga aktualizacji obu miejsc. Kierunek: ciemny Spatial UI, karty Bento, pływająca nawigacja, amber CTA, cyan actions i violet deadline widget. Podstawą M1-T2b jest specyfikacja tekstowa; obrazu referencji nie dostarczono.

## Tokeny

| Token koloru    | Wartość                | Zastosowanie                        |
| --------------- | ---------------------- | ----------------------------------- |
| background      | #090C12                | Tło i tekst na amber                |
| surface         | #11161D                | Karty i podgląd                     |
| surfaceElevated | #151A22                | Nawigacja, micro-cards, pola        |
| border          | rgba(255,255,255,0.14) | Cienkie obramowania                 |
| textPrimary     | #F5F7FA                | Nagłówki i główna treść             |
| textSecondary   | #8F98A8                | Opisy i niedostępność               |
| amber           | #F5A623                | Skanuj                              |
| cyan            | #25E6E6                | Aktywny tab, akcenty i CTA sugestii |
| violet          | #7267FF                | Poświata terminów                   |
| violetTint      | rgba(114,103,255,0.12) | Tło terminów                        |
| violetBorder    | rgba(114,103,255,0.45) | Obramowanie terminów                |
| cyanTint        | rgba(37,230,230,0.10)  | Nieaktywne CTA                      |
| cyanBorder      | rgba(37,230,230,0.35)  | Obramowanie nieaktywnego CTA        |

Typowane tokeny: spacing xs/sm/md/lg/xl/xxl/section = 4/8/12/16/20/24/32; cardRadius = 24; microCardRadius = 18; primaryCtaRadius = 30; touchTarget = 48. Kolory komponentów pochodzą wyłącznie z tokenów. Systemowa typografia: opisy 16/24, nagłówki kart 20, ekran 32, centralny stan terminów 28. Tekst może się skalować i zawijać.

## Layout i karty Bento

- Niemal czarne tło, przewijana treść o szerokości maksymalnej 760, margines 20, odstępy 20, dolny oddech 32.
- Safe Area dla górnej i bocznych krawędzi; ekran skanowania korzysta z natywnego nagłówka i dolnego insetu.
- Karty mają obramowanie 1, promień 24, padding 24. Micro-cards: promień 18, padding 16.
- Bento: karta dominująca na pełną szerokość i elastyczne mniejsze kafle, baza 140, odstęp 16, zawijanie przy braku miejsca. Bez sztywnych wysokości treści.
- Pusty stan dokumentów opisuje przyszłe dane. Kategorie i Archiwum są nieinteraktywnymi miejscami przyszłych funkcji, oznaczonymi „W przygotowaniu”; nie reprezentują dokumentów.

## Bottom navigation

Dokumenty / Skanuj / Ustawienia. Zaokrąglony kontener surfaceElevated z obramowaniem, margines boczny 16 plus Safe Area, szerokość maksymalna 720. Dolny odstęp to większa z wartości: inset i 12. Pasek zajmuje własne miejsce w layoucie, więc nie zasłania przewijanej treści; pływający efekt tworzą odsunięcie od krawędzi i cień.

Skanuj: amber, ciemny tekst, promień 30, minimalna wysokość 60, wysunięcie ponad pasek przez marginTop -24. Otwiera osobny ekran stosu, nie trzeci tab. Aktywny tab ma cyan i semantyczny stan selected. Android Back obsługuje istniejący React Navigation.

## Deadline widget

„Najbliższe terminy”: duża karta violetTint/violetBorder z delikatną poświatą violet. Centralny obszar min. 140, tekst „BRAK TERMINÓW” oraz opis. Brak fikcyjnych liczników, dat i odliczania.

## Skanowanie i OCR

Natywny tytuł „Skanowanie i OCR”. Podgląd min. 300 z czterema cyjanowymi narożnikami i jawną informacją o nieaktywnym aparacie. Narożniki dekoracyjne, bez animacji, bounding boxes i pozorowanego wykrycia.

Dolna karta „Dane z dokumentu”: zawijane pola Data, Kwota, Kategoria z opisem „Brak sugestii”; bez edycji i danych. „Zatwierdź sugestie” używa delikatnego cyan glow, tint zamiast pełnego aktywnego wypełnienia, disabled i accessibilityState.disabled. Niedostępność jest opisana tekstem.

## Nazewnictwo i accessibility

- Nazwa produktu: Termino. Wszystkie treści UI, statusy i etykiety dostępności po polsku. OCR pozostaje wymaganym skrótem w tytule.
- Nie używać etykiet Offline, Sync, Issue, Expiry. Ewentualne przyszłe statusy: „Lokalnie”, „Synchronizacja”, wyłącznie gdy mają potwierdzenie w stanie aplikacji.
- Przyciski i taby: minimum 48 punktów wysokości, polskie accessibilityLabel, role i selected/disabled. Tekst skaluje się bez ograniczania liczby linii.
- Nagłówki mają rolę header; ozdobne narożniki są ukryte przed czytnikiem ekranu. Nieaktywne karty nie udają przycisków ani przełączników.
- Kontrast, TalkBack, duża czcionka i Safe Area wymagają ręcznej weryfikacji na urządzeniu.

## Glow i shadow

Wspólne, typowane effects: card (kolor background, offset 0/4, opacity 0.18, radius 8, elevation 2), amber (0/3, 0.24, 10, 4), violet (0/0, 0.18, 16, 2), cyan (0/0, 0.12, 8, 1). Glow wyłącznie przy CTA i stanie terminów. Bez blur library, nowych fontów i zależności. Różnice renderowania cieni między platformami są możliwe; obramowania utrzymują czytelny podział powierzchni.

## IMPLEMENTED NOW

- Wspólne tokeny palety, odstępów, promieni i efektów; ciemny motyw nawigacji.
- Dashboard: Termino, dokumenty, pusty violet widget i układ Bento bez danych demonstracyjnych.
- Pływający pasek z amber Skanuj i cyan zaznaczeniem aktywnej sekcji.
- Ustawienia: Synchronizacja, Powiadomienia, Dane lokalne — jawnie niedostępne karty informacyjne.
- Podgląd przyszłego skanowania, pola kontraktu UI i nieaktywne zatwierdzanie.

## PLANNED LATER

- Rzeczywiste dokumenty i ich micro-cards: tytuł, kwota, data, kategoria; dane wyłącznie z aplikacji.
- Aparat, galeria, import plików, OCR i sugestie z rzeczywistego rozpoznawania.
- Terminy i przypomnienia, synchronizacja oraz zarządzanie danymi lokalnymi.

Powyższe funkcje nie są realizowane w M1-T2b. Manualny smoke test wykonuje użytkownik.
