# Zmiany

Każdy przyszły task aktualizuje ten plik. Wpisy grupujemy według obszaru i opatrujemy datą, tytułem, opisem oraz skutkiem.

## Bootstrap i dokumentacja

### 2026-09-18 — T0.1 / Jawny wybór urządzenia

- Zmieniono `npm run android` na `expo run:android --device`, ponieważ domyślny wybór ponownie kierował instalację na przepełniony emulator-5554.
- Expo wyświetla wybór urządzenia przed buildem/instalacją. README wskazuje, aby nie wybierać przepełnionego AVD. Zmiana nie naprawia osobnej awarii SurfaceFlinger w nowym emulatorze i nie usuwa danych.

### 2026-09-18 — T0.1 / Osobny emulator Termino

- Potwierdzono 351 MB wolnego miejsca na dotychczasowym emulatorze; systemowe czyszczenie cache nie pomogło, instalacja nadal zgłaszała brak miejsca.
- Na zlecenie użytkownika utworzono osobny AVD `Termino_API_36_1`: Pixel 9, istniejący obraz API 36.1 Google Play x86_64, partycja danych 12 GB. Zachowano aplikacje i dane poprzedniego emulatora.
- README opisuje wybór urządzenia podczas uruchamiania, aby instalacja nie trafiała ponownie na przepełniony emulator.
- Poprawiono RAM nowego AVD na 4096 MB (wartość `2G` z generatora była odczytywana jako 256 MB). Potwierdzono około 11 GB wolnego miejsca oraz instalację APK zakończoną `Success`.
- Test ekranu pozostaje zablokowany awarią systemowego SurfaceFlinger (`Assertion failed: !rcEnc->featureInfo()->hasReadColorBufferDma`). Próby grafiki programowej, GPU hosta i wyłączenia HasSharedSlotsHostMemoryAllocator nie usunęły błędu. Nie zmieniano kodu Termino; testowy emulator zatrzymano. Wymagana dalsza naprawa zgodności emulatora/obrazu systemu przed potwierdzeniem UI.

### 2026-09-18 — T0.1 / Lokalna konfiguracja Android SDK

- Po ponownym błędzie linkera potwierdzono, że nowy terminal używał SDK z `Program Files (x86)`; wcześniejsza korekta zmiennych działała tylko w procesie testowym.
- Zapisano właściwy SDK w lokalnym, niewersjonowanym `android/local.properties` i wyczyszczono dwa wygenerowane cache CMake. Konfiguracja Gradle pozostaje dostępna po otwarciu nowego terminala, dopóki katalog natywny nie zostanie zregenerowany.
- README opisuje trwałość ustawienia, odtworzenie po regeneracji i czyszczenie cache. Bez zmian kodu aplikacji, zależności i danych urządzenia.
- Weryfikacja: `app:assembleDebug` dla x86_64 zakończone `BUILD SUCCESSFUL` w 23 s bez nadpisywania ANDROID_HOME/ANDROID_SDK_ROOT. Prettier, kontrola różnic i UTF-8: OK. Nie ponawiano instalacji na emulatorze.

### 2026-09-18 — T0.1 / Inicjalizacja

- Utworzono projekt Termino: React Native, Expo Custom Development Build / Dev Client i TypeScript strict; Android jako platforma MVP.
- Dodano ESLint, Prettier, skrypty start/android, eksport bundla Android, lint, typecheck i kontrolę formatowania; lockfile utrwala zależności.
- Utworzono minimalną strukturę `src/app` i `src/screens`; ekran pokazuje „Termino” i „Projekt zainicjalizowany”. Bez funkcjonalności biznesowej.
- Utworzono krótki README, bazowy plan produktu i 13 zaakceptowanych ADR-ów. Google Calendar wpisano do planowanego zakresu MVP jako osobny, opcjonalny adapter.
- Zapisano zasady offline-first, lokalnego źródła prawdy, wielostronicowych dokumentów i bezstratnych migracji. Baza oraz adaptery pozostają niezaimplementowane.
- Ustawiono UTF-8/LF, usunięto nieużywane zasoby szablonu oraz bezpośrednią zależność expo-status-bar; pasek systemowy wykorzystuje React Native.
- Dodano zasady kontynuacji w `AGENTS.md`; usunięto konfigurację innego agenta dołączoną przez szablon.

#### Walidacja T0.1

- Typecheck, ESLint (0 ostrzeżeń), Prettier, kontrola UTF-8 i eksport bundla Android: OK. `expo install --check`: zgodne wersje; `expo-doctor`: 21/21 kontroli.
- Build natywny debug x86_64: `BUILD SUCCESSFUL` (Android SDK 36, NDK 27.1.12297006, JDK 21.0.8, Gradle 9.3.1).
- Próba instalacji na emulatorze Android 16 / API 36: zablokowana brakiem miejsca (`Requested internal only, but not enough space`). Test wyświetlenia ekranu nie został wykonany; wymagany emulator/telefon z wolnym miejscem. Nie usuwano danych urządzenia.
- Rozwiązano lokalne przeszkody: npm wymagał systemowego magazynu certyfikatów Node, a linker C++ nie działał z SDK w `Program Files (x86)`. Build powiódł się z istniejącym SDK użytkownika bez spacji; instrukcje w README. Nie zmieniano globalnych ustawień środowiska ani weryfikacji TLS.
- npm audit: 10 zgłoszeń moderate w łańcuchu narzędzi Expo → xcode → uuid; brak high/critical. Proponowane `audit fix --force` cofa Expo do SDK 46 — nie zastosowano. ESLint 9.39.5 dobrany przez Expo ma ostrzeżenie o zakończeniu wsparcia; aktualizacja wymaga sprawdzenia zgodności z konfiguracją Expo. Ostrzeżenia natywnych zależności nie blokowały kompilacji.
- Wersje: Expo 57.0.24, Dev Client 57.0.19, React Native 0.86.3, React 19.2.3, TypeScript 6.0.3, ESLint 9.39.5, Prettier 3.9.8; Node 24.15.0, npm 11.12.1.
