#!/bin/bash

# Supprimer la sortie des commandes npm


source_dir="dist/"
destination_dir="/var/www/html"

# git pull
echo -e "\e[0;33mPulling the client...\e[0m"
git pull > /dev/null 2>&1
echo -e -n "\x1B[1A\x1B[0K"
echo -e "\e[0;32mPulling the client\e[0m"

# npm i (without stdout)
echo -e "\e[0;33mInstalling dependencies...\e[0m"
npm i > /dev/null 2>&1
echo -e -n "\x1B[1A\x1B[0K"
echo -e "\e[0;32mInstalling dependencies\e[0m"

# npm run build (without stdout)
echo -e "\e[0;33mBuilding Project...\e[0m"
npm run build > /dev/null 2>&1
echo -e -n "\x1B[1A\x1B[0K"
echo -e "\e[0;32mBuilding Project\e[0m"


# Supprimer le contenu du répertoire de destination s'il existe
if [ -d "$destination_dir" ]; then
    echo -e "\e[0;33mSuppression du contenu de $destination_dir...\e[0m"
    rm -r "$destination_dir"/*
    echo -e -n "\x1B[1A\x1B[0K"
    echo -e "\e[0;32mSuppression du contenu de $destination_dir\e[0m"
else
    echo "Le répertoire de destination $destination_dir n'existe pas."
fi

# Vérifie si le répertoire source existe
if [ -d "$source_dir" ]; then
    # Copie récursive de tous les fichiers et répertoires du répertoire source vers le répertoire de destination
    cp -r "$source_dir"/* "$destination_dir"
    echo "Tous les fichiers du répertoire dist/ ont été copiés vers $destination_dir"
else
    echo "Le répertoire source $source_dir n'existe pas."
    exit 1
fi

python3 server.py
