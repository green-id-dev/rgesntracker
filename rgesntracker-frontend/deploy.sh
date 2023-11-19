#!/bin/bash
# Arrête le service existant
pm2 delete sustainable-checker

# Lance le nouveau service
pm2 start ecosystem.config.cjs --only sustainable-checker -- run astro dev
