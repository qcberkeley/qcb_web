#!/usr/bin/env python3
"""
QCB Website build script.

Page files in src/ are partial HTML (body content only).
First line of each page: <!-- title: Page Title -->

Run:  python3 build.py
Output: dist/
"""

import os
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "src"
DIST = ROOT / "dist"
COMPONENTS = SRC / "_components"


def read(path):
    return path.read_text(encoding="utf-8")


def get_title(content):
    m = re.match(r"\s*<!--\s*title:\s*(.*?)\s*-->", content)
    return m.group(1) if m else "QC@B"


def build():
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir()

    head_tpl = read(COMPONENTS / "head.html")
    navbar = read(COMPONENTS / "navbar.html")
    footer = read(COMPONENTS / "footer.html")

    for item in sorted(SRC.rglob("*")):
        if item.is_dir() or "_components" in item.parts:
            continue

        rel = item.relative_to(SRC)
        out = DIST / rel
        out.parent.mkdir(parents=True, exist_ok=True)

        if item.suffix == ".html":
            content = read(item)
            # Self-contained pages (already have <!DOCTYPE>) are copied verbatim
            if content.lstrip().startswith("<!DOCTYPE"):
                shutil.copy2(item, out)
                print(f"  copied: {rel} (standalone)")
                continue
            title = get_title(content)
            head = head_tpl.replace("{{TITLE}}", title)

            html = f"""<!DOCTYPE html>
<html lang="en">
<head>
{head}
</head>
<body class="antialiased">
{navbar}
{content}
{footer}
</body>
</html>"""
            out.write_text(html, encoding="utf-8")
            print(f"  built:  {rel}")
        else:
            shutil.copy2(item, out)
            print(f"  copied: {rel}")

    # Symlink images into dist
    images_link = DIST / "images"
    if not images_link.exists():
        images_src = ROOT / "images"
        if images_src.exists():
            os.symlink(images_src, images_link)
            print(f"  linked: images → {images_src}")
        else:
            print("  warning: images/ directory not found at project root")

    print("\nDone → dist/")


if __name__ == "__main__":
    build()
