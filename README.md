# Trainingstagebuch

Ein schlichter Trainingslog für Gerätetraining im Fitnessstudio: eine einzige HTML-Datei, ohne Server und ohne Konto.

## Funktionen

- Routinen anlegen und bearbeiten, mit Hinweisen pro Übung (z. B. „langsam: 3 Sek. runter, 2 Sek. halten“)
- Training aus einer Routine starten, die Werte vom letzten Mal sind schon eingetragen
- Gewicht leer lassen = Körpergewicht
- Verlauf aller Trainings und Fortschrittskurve pro Übung
- Import von Gym-Hero-Exporten (CSV)

## Daten

Die Daten liegen nur im Browser des Geräts. Nach jedem Training bietet die App an, eine CSV-Sicherung mit allen Trainings und Routinen zu speichern (z. B. in iCloud Drive). Auf einem neuen Gerät wird einfach die neueste CSV importiert.

Die CSV nutzt das Spaltenformat von Gym Hero. Routinen stehen zusätzlich als Zeilen mit `Workout #` = `Routine` darin.

## Nutzung

`index.html` im Browser öffnen, z. B. über GitHub Pages.
