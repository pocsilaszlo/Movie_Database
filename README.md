# Movie_Database
Spring boot - React - PostgreSQL - Heroku - Netlify application

Ez a projekt egy webalkalmazás, amely lehetővé teszi a felhasználók számára, hogy böngésszenek egy több mint 1000 filmet tartalmazó katalógusban. A filmadatok az IMDB-ből származó CSV fájl alapján kerülnek betöltésre, és az alkalmazás biztosítja a filmek listázását, keresését és részleteik megtekintését.

## Funkcionalitások

- **Felhasználói fiókkezelés**: Regisztráció, bejelentkezés, jelszó visszaállítás, és felhasználói profil szerkesztése.
- **Adminisztrátori panel**: Filmek és sorozatok hozzáadása, módosítása, törlése.
- **Filmek listázása**: Az alkalmazás megjeleníti az összes filmet egy kereshető felületen.
- **Keresés és szűrés**: A felhasználók kereshetnek a filmek között cím vagy műfaj alapján.
- **Film részleteinek megtekintése**: Részletes információk elérhetők az egyes filmekről.

## Technológiák

- **Frontend**: React.js (Netlify-n hostolva).
- **Backend**: Spring Boot (Heroku-n hostolva).
- **Adatbázis**: PostgreSQL (Heroku által biztosított).
- **Dizájn**: A Bolt AI segített a frontend kinézetének tervezésében.

## Deploy

Az alkalmazás természetesen hostolás nélkül is működőképes localhoston a környezeti változók megfelelő beállítása után.

### Frontend (Netlify)

1. Lépj be a Netlify fiókodba és hozz létre egy új projektet.
2. Állítsd be a környezeti változókat a Netlify beállításaiban:
   ```env
   VITE_BACKEND_URL=<heroku_backend_api_url>
   ```
3. Állítsd be a **Base directory** értékét a `frontend/movies` mappára.
4. Állítsd be a **Build command** értékét:
   ```bash
   npm install && npm run build
   ```
5. Állítsd be a **Publish directory** értékét a dist mappára.
6. Deployold a projektet.

### Backend (Heroku)

1. Telepítsd a Heroku CLI-t és lépj be a fiókodba.
2. Készíts egy új Heroku alkalmazást.
3. Állítsd be a következő környezeti változókat a Heroku alkalmazásban:
   ```env
   DB_USERNAME=<heroku_postgresql_felhasználónév>
   DB_PASSWORD=<heroku_postgresql_jelszó>
   DATABASE_URL=<heroku_postgresql_url>
   PROJECT_PATH=backend/movies
   ```
4. Deployold az alkalmazást a Heroku CLI segítségével:
   ```bash
   git push heroku main
   ```

## További információ

- A frontend dizájntervezésében a **Bolt AI** segített.
- Az alkalmazás adatai egy IMDB-ből származó CSV fájl alapján kerülnek betöltésre.

---

## Funkciók

### Felhasználói Regisztráció és Bejelentkezés

**Fiók létrehozása**
A felhasználók regisztrálhatják fiókjukat az alkalmazásban egy felhasználónév, email és jelszó megadásával, hogy hozzáférjenek az alkalmazás szolgáltatásaihoz.

**Bejelentkezés**
Regisztrált felhasználók az email címük és jelszavuk megadásával jelentkezhetnek be, hogy használni tudják az alkalmazás funkcióit.

**Jelszó visszaállítás**
Ha egy felhasználó elfelejti a jelszavát, lehetősége van azt visszaállítani egy emailben kapott visszaállító link segítségével.

- A felhasználó email címet ad meg a visszaállításhoz.
- A rendszer emailben küld egy jelszó-visszaállító linket.
- A felhasználó új jelszót adhat meg a link segítségével.

**Profil megtekintése és szerkesztése**
A felhasználók megtekinthetik és módosíthatják saját profiljukat, beleértve a felhasználónevet, email címet és jelszót.

- A profiloldalon az aktuális adatok láthatók.
- Az adatok szerkeszthetők és menthetők.

### Adminisztrátori Funkciók

**Adminisztrátori jogosultságok**
Az adminisztrátor hozzáfér az adminisztrációs panelhez, ahol kezelheti a filmeket, sorozatokat.

**Filmek és sorozatok kezelése**
Az adminisztrátor listázhatja, hozzáadhatja, módosíthatja vagy törölheti a filmeket és sorozatokat az adatbázisban.

**Új sorozat hozzáadása**
Az adminisztrátor kitöltheti a szükséges mezőket (pl. cím, évadok száma, epizódok száma) és hozzáadhat új sorozatokat az alkalmazáshoz.

**Sorozatok módosítása**
A meglévő sorozatok adatai frissíthetők az adminisztrációs panelen keresztül.

- Az adminisztrátor szerkesztheti a sorozatok címét, évadait, epizódjait.
- A módosított adatok sikeresen menthetők.

**Sorozatok törlése**
Nem kívánt sorozatok törölhetők az adatbázisból az adminisztrációs panel segítségével.

---

## Elkészült Funkciók

- Felhasználói regisztráció. Kész.
- Bejelentkezés. Kész.
- Kijelentkezés. Kész.
- Jelszó visszaállítás. Folyamatban.
- Felhasználói profil megtekintése és szerkesztése. Megteintés kész, többi folyamatban.
- Adminisztrátori panel hozzáférés. Folyamatban.
- Filmek és sorozatok listázása. Kész.
- Filmek és sorozatok szűrése, rendezése. Folyamatban.
- Új sorozat hozzáadása. Folyamatban.
- Sorozatok módosítása. Folyamatban.
- Sorozatok törlése. Folyamatban.

