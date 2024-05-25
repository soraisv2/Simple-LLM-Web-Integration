#!/bin/bash

source_dir="dist/"
destination_dir="/var/www/html"

echo "Building project..."
npm i
npm run build
echo "Deploying project..."

# Supprimer le contenu du répertoire de destination s'il existe
if [ -d "$destination_dir" ]; then
    echo "Suppression du contenu de $destination_dir..."
    rm -r "$destination_dir"/*
    echo "Contenu de $destination_dir supprimé avec succès."
else
    echo "Le répertoire de destination $destination_dir n'existe pas."
fi

Vérifie si le répertoire source existe
if [ -d "$source_dir" ]; then
    # Copie récursive de tous les fichiers et répertoires du répertoire source vers le répertoire de destination
    cp -r "$source_dir"/* "$destination_dir"
    echo "Tous les fichiers du répertoire dist/ ont été copiés vers $destination_dir"
else
    echo "Le répertoire source $source_dir n'existe pas."
    exit 1
fi

python3 server.py
