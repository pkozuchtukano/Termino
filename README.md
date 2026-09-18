# Terminie

Terminie to rozwijana aplikacja mobilna do dokumentów i terminów, projektowana offline-first. Obecny szkielet zawiera lokalne ekrany Dokumenty, Ustawienia i Dodaj dokument; MVP jest przeznaczone na Androida.

## Wymagania

- Node.js LTS ≥22.13 (testowane 24.15.0), npm i Git.
- Android Studio, Android SDK Platform 36, Build Tools 36, platform-tools, emulator lub urządzenie z debugowaniem USB.
- JDK 17 lub 21, poprawne `JAVA_HOME` i `ANDROID_HOME`; `adb` w PATH.
- Internet do pierwszego pobrania zależności i narzędzi builda. Development Build korzysta z lokalnego Metro; nie jest samodzielnym buildem produkcyjnym.

Na Windows użyj SDK ze ścieżki bez spacji (instalacja w `Program Files (x86)` powodowała błąd linkera C++). Dla standardowej instalacji Android Studio ustaw w bieżącym PowerShell:

```powershell
$env:ANDROID_HOME = "$env:LOCALAPPDATA/Android/Sdk"
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
```

Zmienne powyżej obowiązują tylko w bieżącym terminalu. Dla istniejącego projektu natywnego zapisz też w niewersjonowanym `android/local.properties` linię `sdk.dir=C:/Users/TWOJ_UZYTKOWNIK/AppData/Local/Android/Sdk`, używając rzeczywistej ścieżki. Po regeneracji katalogu `android` sprawdź ten plik ponownie. Po zmianie SDK usuń wygenerowane cache `android/app/.cxx` oraz `node_modules/expo-modules-core/android/.cxx` przed kolejnym buildem.

## Instalacja

```sh
npm ci
```

Jeśli Node 24 zgłasza `UNABLE_TO_VERIFY_LEAF_SIGNATURE`, użyj zaufanych certyfikatów systemowych: `$env:NODE_OPTIONS = '--use-system-ca'` w PowerShell przed instalacją/uruchomieniem. Nie wyłączaj weryfikacji TLS.

## Android Development Build

Uruchom emulator lub podłącz urządzenie (`adb devices`), następnie:

```sh
npm run android
```

Skrypt zawsze otwiera wybór urządzenia (`expo run:android --device`). Wybierz działający emulator lub telefon z wolnym miejscem. Lokalnie do walidacji M1-T1 używany jest `Termino_API_36`; nie wybieraj wcześniejszego, niestabilnego `Termino_API_36_1`.

Polecenie generuje projekt natywny, buduje i instaluje Dev Client oraz uruchamia Metro. Kolejne sesje ze zbudowanym klientem:

```sh
npm start
```

Naciśnij `a`, aby otworzyć aplikację na Androidzie. Start: „Dokumenty”; dolny pasek przełącza Dokumenty/Ustawienia, przycisk „Dodaj” otwiera osobny ekran, systemowy Back wraca do sekcji. Po instalacji zależności M1-T2 wymagany jest rebuild przez `npm run android`. Po zmianach aliasów w `tsconfig.json` zrestartuj Metro. Szczegóły struktury i decyzji znajdują się w `/docs`.

## Jakość

```sh
npm run lint
npm run typecheck
npm run format:check
npm run format
npm run build:android:js
```

Ostatnia komenda sprawdza eksport bundla JS dla Androida; nie zastępuje natywnego builda. W PowerShell można używać `npm.cmd`, jeśli polityka wykonania blokuje shim `npm.ps1`.

Dokumentacja projektu: [docs](docs/Plan.md), [decyzje architektoniczne](docs/Architektura.md), [zmiany](docs/Zmiany.md).
