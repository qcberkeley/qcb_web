#!/usr/bin/env bash
# Enforce secure POSIX file permissions for OCF public_html
set -euo pipefail

echo "Securing directory permissions..."
find . -type d -exec chmod 755 {} +

echo "Securing file permissions..."
find . -type f -exec chmod 644 {} +

echo "Permissions hardening complete."
