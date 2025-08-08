# Guide pour l'image de preview

## Image de preview requise

Pour que les previews fonctionnent parfaitement sur WhatsApp, Messenger, etc., vous devez ajouter une image `preview-image.jpg` dans le dossier `public/`.

### Spécifications de l'image :

- **Nom du fichier** : `preview-image.jpg`
- **Emplacement** : `public/preview-image.jpg`
- **Dimensions recommandées** : 1200x630 pixels (ratio 1.91:1)
- **Format** : JPG ou PNG
- **Taille** : Maximum 8MB (mais idéalement < 1MB pour un chargement rapide)

### Contenu suggéré pour l'image :

1. **Photo de Gilson** en action (coaching, sport)
2. **Texte incrusté** :
   - "Gilson Mendes"
   - "Coach Sportif Côte d'Azur"
   - "06 17 04 35 99"
   - "@gilsonmendes_coach"
3. **Design** : Utiliser les couleurs du site (bleus océan/azur)
4. **Background** : Style Côte d'Azur (océan, ciel bleu)

### Outils recommandés pour créer l'image :

- **Canva** (templates "Facebook Cover" ou "Twitter Header")
- **Figma** (template 1200x630)
- **Photoshop**
- **GIMP** (gratuit)

### Test des previews :

Une fois l'image ajoutée, vous pouvez tester les previews sur :
- **Facebook Debugger** : https://developers.facebook.com/tools/debug/
- **Twitter Card Validator** : https://cards-dev.twitter.com/validator
- **WhatsApp** : Envoyez-vous le lien à vous-même

### Note :

En attendant l'image, j'ai configuré toutes les métadonnées nécessaires. Le preview affichera déjà le titre, la description et les informations de contact.