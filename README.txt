ROZMÓWNICA — instrukcja uruchomienia
======================================

WYMAGANIA
- Node.js (wersja 18 lub nowsza). Pobierz z https://nodejs.org jeśli nie masz.
- Brak dodatkowych zależności — nic nie trzeba instalować przez npm.

URUCHOMIENIE NA WŁASNYM KOMPUTERZE
1. Rozpakuj ten folder.
2. Otwórz terminal / wiersz poleceń w tym folderze.
3. Uruchom komendę:
     node server.js
4. W przeglądarce wejdź na: http://localhost:3000
5. Pierwsze założone konto (Twoje) automatycznie staje się kontem
   administratora z pełnym dostępem do zarządzania.

WAŻNE: DOSTĘPNOŚĆ POD "JEDNYM LINKIEM" W INTERNECIE
Uruchomienie powyższą komendą działa TYLKO na Twoim komputerze
(localhost) — inne osoby w internecie nie zobaczą tej strony,
dopóki nie wystawisz serwera publicznie. Aby mieć jeden link,
który każdy może otworzyć i się zarejestrować, musisz wdrożyć ten
folder na serwerze / hostingu, np.:
  - Railway.app, Render.com, Fly.io — proste wdrożenie aplikacji Node.js
    (wgrywasz folder, dostajesz publiczny adres URL)
  - Własny VPS (np. DigitalOcean, OVH) z zainstalowanym Node.js
    i uruchomieniem "node server.js" (najlepiej pod nadzorem np. pm2,
    żeby serwer wznawiał się po restarcie)
  - Dowolny hosting obsługujący aplikacje Node.js

Po wdrożeniu link, który dostaniesz od hostingu (np.
https://twoja-aplikacja.up.railway.app), jest właśnie tym jednym
linkiem do rozesłania — każdy, kto go otworzy, będzie mógł założyć
tam stałe konto.

DANE
Wszystkie konta, pokoje i wiadomości zapisywane są w pliku
data.json, który powstanie automatycznie w tym samym folderze po
pierwszym uruchomieniu. Kopia zapasowa = kopia tego pliku.

BEZPIECZEŃSTWO
Hasła są haszowane (PBKDF2 + sól), ale to prosty, samodzielny
serwer bez zaawansowanych zabezpieczeń (np. ochrony przed atakami
typu brute-force; HTTPS trzeba zapewnić na poziomie hostingu). Do
rozmów w gronie znajomych / małej społeczności — wystarczające.
