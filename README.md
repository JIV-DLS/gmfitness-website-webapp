# 🏋️ GML Fitness - Site Web Coach Sportif

Site web moderne et responsive pour coach sportif professionnel, développé avec React + Vite + Tailwind CSS + Framer Motion.

## ✨ Fonctionnalités

- 🎨 **Design moderne** : Interface élégante avec animations smooth
- 📱 **Responsive** : Optimisé pour tous les appareils (mobile, tablette, desktop)
- ⚡ **Performance** : Built avec Vite pour un développement rapide
- 🎭 **Animations** : Transitions fluides avec Framer Motion
- 🚀 **Déploiement automatique** : Pipeline GitHub Actions vers GitHub Pages
- 📧 **Formulaire de contact** : Prêt pour intégration EmailJS/Netlify
- 🎯 **SEO Ready** : Structure optimisée pour le référencement

## 🛠 Technologies

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Déploiement**: GitHub Pages + GitHub Actions
- **Linting**: ESLint

## 🚀 Installation & Développement

### Prérequis
- Node.js 18+ et npm

### Installation
```bash
# Cloner le repository
git clone https://github.com/jonasvihoaleaniglo/gmfitness-website.git
cd gmfitness-website

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

### Scripts disponibles
```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Aperçu du build
npm run deploy       # Déploiement manuel sur GitHub Pages
```

## 📦 Déploiement

### Déploiement automatique (Recommandé)
Le site se déploie automatiquement sur GitHub Pages à chaque push sur la branche `main` grâce au pipeline GitHub Actions.

**Configuration nécessaire :**
1. Aller dans Settings > Pages de votre repository
2. Source : "GitHub Actions"
3. Le site sera disponible sur : `https://jonasvihoaleaniglo.github.io/gmfitness-website/`

### Déploiement manuel
```bash
npm run deploy
```

## 🎨 Personnalisation

### Couleurs
Modifiez les couleurs dans `tailwind.config.js` :
```js
theme: {
  extend: {
    colors: {
      primary: {
        50: '#fef2f2',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
      }
    }
  }
}
```

### Contenu
1. **Informations coach** : Modifier `src/components/About.jsx`
2. **Services** : Modifier `src/components/Services.jsx`
3. **Contact** : Modifier `src/components/Contact.jsx`

### Formulaire de contact
Pour connecter le formulaire :
- **EmailJS** : Ajouter la configuration dans `Contact.jsx`
- **Netlify Forms** : Ajouter `data-netlify="true"` au formulaire
- **API custom** : Modifier la fonction `handleSubmit`

## 📁 Structure du projet

```
src/
├── components/          # Composants React
│   ├── Header.jsx      # Navigation
│   ├── Hero.jsx        # Section héro
│   ├── Services.jsx    # Services proposés
│   ├── About.jsx       # À propos du coach
│   ├── Contact.jsx     # Formulaire de contact
│   └── Footer.jsx      # Pied de page
├── App.jsx             # Composant principal
├── main.jsx           # Point d'entrée
└── index.css          # Styles Tailwind
```

## 🔧 Personnalisation avancée

### Ajouter de nouvelles sections
1. Créer un nouveau composant dans `src/components/`
2. L'importer dans `App.jsx`
3. Ajouter la navigation dans `Header.jsx`

### Intégrations possibles
- **Google Analytics** : Ajouter le script dans `index.html`
- **Calendly** : Intégrer le widget de réservation
- **Stripe** : Ajouter les paiements
- **Blog** : Ajouter une section blog avec markdown

## 📱 Responsive Design

Le site est optimisé pour :
- 📱 Mobile : 320px+
- 📟 Tablette : 768px+
- 💻 Desktop : 1024px+

## 🎯 SEO & Performance

- Meta tags optimisés
- Images optimisées
- Lazy loading
- Code splitting avec Vite
- Lighthouse Score > 90

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📞 Support

Pour toute question ou support :
- 📧 Email : contact@gmfitness.fr
- 💬 GitHub Issues : [Ouvrir une issue](https://github.com/jonasvihoaleaniglo/gmfitness-website/issues)

---

Made with ❤️ for fitness coaches who want a modern web presence.
