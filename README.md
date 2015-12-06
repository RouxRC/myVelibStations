# myVelibStations

Petite appli web simple affichant les places et vélos disponibles sur une sélection de groupes de stations Vélib'.

Pratique pour mettre dans son smartphone ;)

Adapté librement du [projet de @TDudouet](https://github.com/tdudouet/velib) (désormais disparu :( mais sous BSD lorsque copié) via la [reprise de @GLebourgeois](http://velib.guillaume-lebourgeois.fr).


## Installation

- Définir ses groupements de station :

```bash
cp resources/js/config.js{.example,}
# éditer le fichier nouvellement créé resources/js/config.js
```

- Rêgler une crontab qui collecte les données :

```bash
crontab -e
# ajouter une ligne du type suivant avec ##PATH## le chemin vers ce dossier
# */2 *  * * *      ##PATH##/resources/bin/cache_data.sh
```

- Servir l'appli quelque part en ligne :

Simplement servir ce dossier avec apache, nginx, etc.

