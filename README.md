# Lancement du Projet

Ce document vous guide à travers les étapes nécessaires pour lancer correctement le projet.

## Étape 1: Configuration de l'API OCMovies

Pour que le projet fonctionne correctement, il est nécessaire d'installer et de configurer l'API OCMovies. Suivez les instructions détaillées sur le [repo GitHub d'OCMovies](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR) pour installer et mettre en route l'API.

### Résumé des étapes clés :
1. Clonez le repo GitHub d'OCMovies.
2. Suivez les instructions d'installation dans le README du repo.
3. Si l'API a déjà été installée précédemment, vous pouvez la lancer directement avec la commande suivante :

```python manage.py runserver```


## Étape 2: Lancement du Projet HTML/CSS/JS avec Live Server

Après avoir configuré l'API, la prochaine étape est de lancer le front-end du projet qui est construit avec HTML, CSS et JavaScript.

1. Ouvrez le projet dans Visual Studio Code (VS Code).
2. Assurez-vous d'avoir installé l'extension "Live Server" dans VS Code. Si ce n'est pas le cas, vous pouvez l'installer depuis le marketplace des extensions de VS Code.
3. Une fois l'extension installée, faites un clic droit sur le fichier HTML principal de votre projet (généralement `index.html`) et sélectionnez `Open with Live Server`.
4. Live Server démarrera un serveur local et ouvrira votre projet dans le navigateur par défaut. 

### Remarques :
- Assurez-vous que l'API OCMovies est en cours d'exécution pendant que vous travaillez sur le projet HTML/CSS/JS, car le front-end dépend des données fournies par cette API.
- Si vous rencontrez des problèmes pour lancer Live Server, vérifiez la documentation ou le support de l'extension pour obtenir de l'aide.
