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

    # Symlink images from old site into dist
    images_link = DIST / "images"
    if not images_link.exists():
        old_images = (ROOT.parent / "qcb_web" / "images").resolve()
        if old_images.exists():
            os.symlink(old_images, images_link)
            print(f"  linked: images → {old_images}")
        else:
            print("  warning: images directory not found — create dist/images manually")

    print("\nDone → dist/")


if __name__ == "__main__":
    build()
