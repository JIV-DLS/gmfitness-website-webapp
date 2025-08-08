#!/bin/bash

# 🌙 Script pour corriger le mode sombre sur tout le site

echo "🌙 Correction du mode sombre pour tous les composants..."

# Fonction pour ajouter les classes dark aux fichiers
fix_component() {
    local file=$1
    echo "🔧 Correction de $file..."
    
    # Sauvegarder l'original
    cp "$file" "$file.backup"
    
    # Remplacements courants pour le mode sombre
    sed -i '' \
        -e 's/bg-white\([^-]\)/bg-white dark:bg-gray-800\1/g' \
        -e 's/bg-gray-50\([^-]\)/bg-gray-50 dark:bg-gray-800\1/g' \
        -e 's/bg-gray-100\([^-]\)/bg-gray-100 dark:bg-gray-900\1/g' \
        -e 's/text-gray-900\([^-]\)/text-gray-900 dark:text-white\1/g' \
        -e 's/text-gray-800\([^-]\)/text-gray-800 dark:text-gray-200\1/g' \
        -e 's/text-gray-700\([^-]\)/text-gray-700 dark:text-gray-300\1/g' \
        -e 's/text-gray-600\([^-]\)/text-gray-600 dark:text-gray-400\1/g' \
        -e 's/text-gray-500\([^-]\)/text-gray-500 dark:text-gray-400\1/g' \
        -e 's/border-gray-200\([^-]\)/border-gray-200 dark:border-gray-700\1/g' \
        -e 's/border-gray-300\([^-]\)/border-gray-300 dark:border-gray-600\1/g' \
        -e 's/text-primary-600\([^-]\)/text-primary-600 dark:text-primary-400\1/g' \
        -e 's/bg-primary-600\([^-]\)/bg-primary-600 dark:bg-primary-500\1/g' \
        "$file"
    
    echo "✅ $file corrigé"
}

# Corriger tous les composants principaux
for file in src/components/*.jsx; do
    if [ -f "$file" ]; then
        fix_component "$file"
    fi
done

echo ""
echo "🎉 Mode sombre corrigé pour tous les composants !"
echo ""
echo "📝 Fichiers modifiés :"
ls -la src/components/*.jsx | grep -v backup
echo ""
echo "🔙 Sauvegardes créées avec extension .backup"
echo "🗑️  Pour supprimer les sauvegardes : rm src/components/*.backup"