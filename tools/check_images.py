#!/usr/bin/env python3
"""Check every image under assets/: weight (limit 600 KB) and EXIF GPS block.

Prints one line per image and a final count; exits with status 1 if an image
is above 600 KB or still carries GPS data.

Usage (from the repository root):
    pip install pillow
    python3 tools/check_images.py
"""

import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}
MAX_BYTES = 600 * 1024
GPS_IFD = 0x8825


def main():
    files = sorted(p for p in (ROOT / "assets").rglob("*") if p.suffix.lower() in EXTENSIONS)
    problems = 0
    for path in files:
        size = path.stat().st_size
        with Image.open(path) as img:
            gps = img.getexif().get_ifd(GPS_IFD)
            dims = f"{img.size[0]}x{img.size[1]}"
        flags = []
        if gps:
            flags.append("GPS!")
        if size > MAX_BYTES:
            flags.append(">600KB!")
        problems += bool(flags)
        print(f"{size // 1024:>5} KB  {dims:>9}  GPS: {'YES' if gps else 'none'}  "
              f"{path.relative_to(ROOT)}  {' '.join(flags)}")
    print(f"\n{len(files)} images checked, {problems} with a problem.")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
