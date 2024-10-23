# PutaClic – Version Mexicaine 🎉

## Objectif du projet

Développer un jeu interactif en JavaScript sur le thème mexicain. Le joueur doit cliquer sur des objets culturels tels que des piñatas, des calaveras (crânes en sucre), et des cactus qui apparaissent aléatoirement à l'écran pour marquer des points dans un temps imparti. Le jeu propose trois niveaux de difficulté avec des paramètres variés.

## Fonctionnalités principales

### 1. Niveaux de difficulté

Le jeu propose 3 niveaux de difficulté thématiques :

- **¡Chiquito!** (Facile)
- **¡Valiente!** (Intermédiaire)
- **¡Luchador!** (Difficile)

Les paramètres modifiés selon le niveau incluent :

- Nombre d'objets qui apparaissent.
- Temps de jeu imparti.
- Temps d’apparition des objets.

### 2. Système d'objets à cliquer

Les objets à cliquer sont des éléments culturels mexicains :

- **Piñata** : +1 point  
  <img src="images/pinata.png" alt="Cactus" width="250" height="250">

- **Calavera dorée** : +5 points (bonus)  
  <img src="images/calavera.png" alt="Cactus" width="250" height="250">

- **Cactus** : -2 points (malus)  
  <img src="images/cactus.png" alt="Cactus" width="250" height="250">

Les objets apparaissent aléatoirement et disparaissent après un certain temps.

### 3. Système de score

- **Score en temps réel** : affiché pendant la partie.
- Les objets bonus et malus influencent le score.

### 4. Interface utilisateur

- **Choix des niveaux** : via une interface thématique mexicaine.
- **Affichage du temps restant** : compteur ou barre de progression.
- **Affichage du score** : visible en temps réel.

## BONUS

- **Objets en mouvement** : Les objets se déplacent et leur vitesse augmente avec la difficulté.
- **Meilleur score** : sauvegardé dans le local storage et mis à jour si battu.
- **Effets d’animation** :
  - Les **piñatas** explosent en confettis quand elles sont cliquées.
  - Les **calaveras dorées** déclenchent des effets lumineux ou des fleurs de cempasúchil.
  - Les **cactus** provoquent des épines autour du curseur en cas de clic.

## Musique et sons

- **Bruitages** : les objets produisent des sons spécifiques (maracas, guitare mariachi).
- **Musique de fond** : ambiance mexicaine qui s’intensifie avec la difficulté.

## Technologies utilisées

- **JavaScript** (API Canvas pour les animations)
- **HTML/CSS** (interface utilisateur)

## Points techniques

### 1. Génération des objets

Les objets sont générés de manière aléatoire sur le canvas.

### 2. Gestion des événements de clic

Les clics sont détectés en fonction des coordonnées des objets, modifiant le score (bonus/malus).

### 3. Système de timing

Un compteur régit la durée de la partie avec un affichage en temps réel.

## Étapes de développement

1. Création de la structure HTML/CSS pour l'interface.
2. Développement du système de génération aléatoire d'objets.
3. Implémentation de la gestion du score et des clics.
4. Ajout des niveaux de difficulté.
5. Tests et équilibrage de la difficulté pour une meilleure expérience utilisateur.

🎉 **Amusez-vous bien !**
