---
name: terminie-task-workflow
description: Oszczędny kontekstowo workflow implementacji tasków w projekcie Terminie — punktowe odczyty, automatyczna walidacja, lokalny commit i tekst PR; manualny smoke test wykonuje użytkownik. Stosuj przy implementacji i utrzymaniu tego projektu.
---

# Terminie — workflow taska

## Kontekst i zakres

- Najpierw czytaj wyłącznie pliki wskazane w tasku, z uwzględnieniem obowiązujących instrukcji projektu. Nie skanuj całego repo bez potrzeby.
- Gdy potrzebujesz kontekstu architektonicznego, odczytaj tylko odpowiednie fragmenty `docs/Architektura.md`, `docs/DesignSystem.md` lub `docs/Plan.md`. Ścieżki są względem projektu. Brakującego dokumentu nie twórz na zapas ani nie zakładaj jego treści.
- Nie rekonstruuj historii projektu z repo. Dodatkowe pliki otwieraj tylko jako bezpośrednie zależności zmienianego kodu lub konfigurację niezbędną do jego walidacji. Jeśli task nie wskazuje plików, wykonaj wąskie wyszukanie właściwego punktu wejścia.
- Jeden task jest hermetyczny: bez kolejnych tasków, pobocznych refaktorów i zależności na przyszłość. Krytyczny brak informacji wyjaśnij przed zależną od niego zmianą.

## Implementacja i walidacja

- Wykonaj zmianę zgodną z celem i istniejącymi konwencjami.
- Automatycznie wykonuj adekwatne istniejące: typecheck, lint, formatter/check, testy automatyczne oraz build wymagany do technicznej walidacji. Nie instaluj narzędzi testowych bez potrzeby i nie powtarzaj udanych kontroli bez nowej przyczyny.
- Nie wykonuj manualnych testów interfejsu za użytkownika. Nie klikaj po emulatorze/symulatorze, także przez ADB lub automatyzację UI, aby zastąpić test użytkownika. Istniejące testy automatyczne pozostają dozwolone.
- Przygotuj krótką checklistę manualnego smoke testu z oczekiwanymi wynikami. Użytkownik wykonuje ją sam i przekazuje wynik. Nie raportuj manualnej walidacji jako zaliczonej przed otrzymaniem wyniku; oddziel gotową implementację od oczekującego smoke testu.
- Raportuj konkretne błędy i ograniczenia środowiskowe; nie maskuj ich osłabianiem reguł.

## Dokumentacja i Git

- Każdą zmianę zapisz zwięźle w `docs/Zmiany.md`: data, task, zmiana/skutek, walidacje i ograniczenia. Inne dokumenty aktualizuj tylko gdy zmiana tego wymaga; bez powielania treści. Jeśli instrukcje projektu wymagają głównego `Zmiany.md`, dodaj tam krótki wpis z odsyłaczem.
- Sprawdź `git status`, przejrzyj cały diff taska i wykonaj lokalny commit wyłącznie związanych zmian. Nie dołączaj cudzych zmian, sekretów, konfiguracji IDE ani artefaktów. Sprawdź status po commicie i podaj hash; nie czyść cudzych zmian dla uzyskania czystego statusu.
- Przygotuj tytuł i krótki opis PR wyłącznie tekstowo.
- Absolutnie nie wykonuj `git push`, force push, `gh pr create`, tworzenia zdalnego PR przez API, remote merge ani publikacji brancha. Push zawsze wykonuje użytkownik.

## Krótki raport końcowy

Podaj tylko: co zmieniono; automatyczne walidacje i wyniki; commit hash; git status; checklistę manualnego testu; tytuł i tekst PR (zmiany, testowanie, istotne ograniczenia).

Oszczędzaj tokeny: nie cytuj całych plików, nie powtarzaj dokumentacji ani opisu architektury. Odczytuj potrzebne fragmenty i raportuj tylko informacje potrzebne do decyzji użytkownika.
