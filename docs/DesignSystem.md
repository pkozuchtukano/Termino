# Termino — Dark Spatial UI

Ten dokument jest źródłem prawdy dla wyglądu Termino. Implementacja tokenów: src/shared/theme/index.ts. Zmiana stylu wymaga aktualizacji obu miejsc. Kierunek: ciemny Spatial UI, karty Bento, pływająca nawigacja, amber CTA, cyan actions i violet deadline widget. Podstawą jest specyfikacja M1-T2b i przesłana wizualizacja dwóch telefonów. Odwzorowujemy język wizualny, bez fikcyjnych dokumentów, odliczania i wyników OCR.

## Tokeny

| Token koloru    | Wartość                | Zastosowanie                        |
| --------------- | ---------------------- | ----------------------------------- |
| background      | #090C12                | Tło aplikacji                       |
| surface         | #11161D                | Karty i podgląd                     |
| surfaceElevated | #151A22                | Nawigacja, micro-cards, pola        |
| border          | rgba(255,255,255,0.14) | Cienkie obramowania                 |
| textPrimary     | #F5F7FA                | Nagłówki i główna treść             |
| textSecondary   | #8F98A8                | Opisy i niedostępność               |
| amber           | #F5A623                | Centralne CTA „+ Dodaj”              |
| cyan            | #25E6E6                | Aktywny tab, akcenty i CTA sugestii |
| violet          | #7267FF                | Poświata terminów                   |
| violetTint      | rgba(114,103,255,0.12) | Tło terminów                        |
| violetBorder    | rgba(114,103,255,0.45) | Obramowanie terminów                |
| cyanTint        | rgba(37,230,230,0.10)  | Nieaktywne CTA                      |
| cyanBorder      | rgba(37,230,230,0.65)  | Obramowanie nieaktywnego CTA        |

Dodatkowe tokeny: amberTint = #241E15 (ciemne wypełnienie centralnego CTA), violetText = #A69FFF (czytelny fioletowy tekst i narożniki), scannerSurface = #0D1117 (ciemny podgląd).

Typowane tokeny: spacing xs/sm/md/lg/xl/xxl/section = 4/8/12/16/20/24/32; cardRadius = 24; microCardRadius = 18; primaryCtaRadius = 30; touchTarget = 48. Kolory komponentów pochodzą wyłącznie z tokenów. Systemowa typografia w typowanych tokenach typography: opisy 15/23, waga 400, tracking 0.3; nagłówki kart 21, waga 500, tracking 0.2; tytuł terminów 23, waga 600; główny stan 38, waga 700, tracking -0.8. Android korzysta z sans-serif / sans-serif-medium, iOS z System. Marka 22, podpis ekranu 14. Nie identyfikujemy kroju z ilustracji jako konkretnej rodziny fontu. Tekst może się skalować i zawijać.

## Layout i karty Bento

- Niemal czarne tło, przewijana treść o szerokości maksymalnej 760, margines 20, odstępy 20, dolny oddech 32.
- Safe Area dla górnej i bocznych krawędzi; ekran skanowania korzysta z natywnego nagłówka i dolnego insetu.
- Karty mają obramowanie 1, promień 24, padding 24. Micro-cards: promień 18, padding 16.
- Bento: karta dominująca na pełną szerokość i elastyczne mniejsze kafle, baza 140, odstęp 16, zawijanie przy braku miejsca. Bez sztywnych wysokości treści.
- Pusty stan dokumentów opisuje przyszłe dane. Kategorie i Archiwum są nieinteraktywnymi miejscami przyszłych funkcji, oznaczonymi „W przygotowaniu”; nie reprezentują dokumentów.

## Bottom navigation

Docelowy kontrakt M1-T3a: **Dokumenty | + Dodaj | Ustawienia**. „+ Dodaj” otworzy wybór: **Dodaj termin ręcznie** / **Skanuj dokument**. Ręczne dodawanie jest równorzędne wobec skanowania; skanowanie to opcjonalny sposób utworzenia terminu. Zmiana jest wyłącznie dokumentacyjna — obecny UI nadal pokazuje „Skanuj”.

Zaokrąglony kontener surfaceElevated z obramowaniem, margines boczny 16 plus Safe Area, szerokość maksymalna 720. Dolny odstęp to większa z wartości: inset i 12. Pasek zajmuje własne miejsce w layoucie, więc nie zasłania przewijanej treści; pływający efekt tworzą odsunięcie od krawędzi i cień.

Centralne CTA „+ Dodaj”: ciemne wypełnienie amberTint, bursztynowy tekst i obrys, promień 24, minimalna wysokość 84, maksymalna szerokość 116. Dekoracyjne tło paska zaczyna się 22 punkty poniżej górnej krawędzi kontenera; przycisk pozostaje w całości wewnątrz obszaru dotyku rodzica. Ikony Dokumentów i Ustawień są geometryczne, bez nowych zależności. Docelowo otwiera wybór sposobu dodania ponad tabami, nie trzeci tab. Aktywny tab ma cyan i semantyczny stan selected. Android Back obsługuje istniejący React Navigation.

## Ręczne dodawanie terminu — planowane

Formularz: **Co zrobić?**, **Termin**, **Powtarzanie (opcjonalne)**, **Notatka (opcjonalna)**. Dokument nie jest wymagany. Powtarzanie opisuje częstotliwość i interwał; data terminu dotyczy bazowego/aktualnego wystąpienia. M1-T3a nie implementuje formularza, wyboru sposobu dodania ani logiki kolejnych wystąpień.

## Deadline widget

„Najbliższe terminy”: karta o promieniu 18 z nieprzezroczystą powierzchnią deadlineSurface (#202239), obrysem deadlineEdge (#8F88D4) oraz jaśniejszą górną i lewą krawędzią deadlineHighlight (#83B9C7). Wyśrodkowany tytuł, centralny obszar min. 110, fioletowy tekst „BRAK TERMINÓW” oraz opis. Brak fikcyjnych liczników, dat i odliczania.

## Skanowanie i OCR

Natywny tytuł „Skanowanie i OCR”. Podgląd min. 320 z czterema jasnofioletowymi narożnikami i jawną informacją o nieaktywnym aparacie. Narożniki dekoracyjne, bez animacji, bounding boxes i pozorowanego wykrycia.

Dolna karta „Dane z dokumentu” delikatnie zachodzi na dół podglądu (32 punkty przy odstępie sekcji 20). Pionowe pola na całą szerokość: Data, Kwota, Kategoria z opisem „Brak sugestii”; bez edycji i danych. „Zatwierdź sugestie” ma podłużny kształt (promień 30), jasny tekst, obrys i delikatny cyan glow, ciemny tint, disabled i accessibilityState.disabled. Niedostępność jest opisana tekstem.

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
- Pływający pasek z ikonami i obrysowanym amber Skanuj i cyan zaznaczeniem aktywnej sekcji.
- Ustawienia: Synchronizacja, Powiadomienia, Dane lokalne — jawnie niedostępne karty informacyjne.
- Podgląd przyszłego skanowania, pola kontraktu UI i nieaktywne zatwierdzanie.

## PLANNED LATER

- Rzeczywiste dokumenty i ich micro-cards: tytuł, kwota, data, kategoria; dane wyłącznie z aplikacji.
- Aparat, galeria, import plików, OCR i sugestie z rzeczywistego rozpoznawania.
- Terminy i przypomnienia, synchronizacja oraz zarządzanie danymi lokalnymi.

Powyższe funkcje nie są realizowane w M1-T2b. Manualny smoke test wykonuje użytkownik.

## Korekta poświaty i typografii z referencji

Karta terminów korzysta z effects.deadline: dwie zewnętrzne warstwy boxShadow (blur 12/24, spread 1/2, offset 0,3 / 0,5) i dwie wewnętrzne (blur 24/22, offset -5,-5 / 0,-8). Tokeny kolorów: deadlineGlow = rgba(114,103,255,0.38), deadlineGlowSoft = rgba(114,103,255,0.18), deadlineInnerCyan = rgba(131,205,218,0.18), deadlineInnerViolet = rgba(133,120,255,0.26). Daje to rozświetlony obrys i miękkie wnętrze zamiast zwykłego cienia elevation. Bez blur library i nowych zależności.

BoxShadow w RN 0.86 wymaga Androida 9+ dla cieni zewnętrznych, 10+ dla wewnętrznych; starsze urządzenia zachowują kolor powierzchni i obramowanie, lecz bez pełnej poświaty. Źródło: https://reactnative.dev/docs/0.86/view-style-props#boxshadow. Efekt wizualny wymaga ręcznej oceny na urządzeniu.
