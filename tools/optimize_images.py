#!/usr/bin/env python3
"""Shrink photos and strip their metadata (EXIF, GPS) before publishing them.

For each file given on the command line (names are kept as they are):
- the EXIF orientation is applied to the pixels, then all metadata is dropped
  (EXIF with GPS position, camera, date...); only the colour profile is kept;
- the longest side is reduced to 1920 px at most;
- JPEG files are written as progressive JPEG, quality 82;
- PNG files stay PNG (lossless); if one is still above 600 KB it is reduced
  to a 256-colour palette, which suits screenshots and diagrams.

Usage (from the repository root):
    pip install pillow
    python3 tools/optimize_images.py assets/images/projects/project-5/*.jpeg
Then run tools/check_images.py to confirm: no GPS block and nothing above 600 KB.
"""

import sys
from pathlib import Path

from PIL import Image, ImageOps

MAX_SIDE = 1920
JPEG_QUALITY = 82
MAX_BYTES = 600 * 1024


def optimize(path: Path) -> None:
    before = path.stat().st_size
    with Image.open(path) as src:
        fmt = src.format  # "JPEG", "MPO" (iPhone JPEG) or "PNG"
        icc = src.info.get("icc_profile")
        full = ImageOps.exif_transpose(src)  # rotate pixels, since EXIF goes away
        img = full.copy()
        img.thumbnail((MAX_SIDE, MAX_SIDE), Image.Resampling.LANCZOS)

        if fmt in ("JPEG", "MPO"):
            # Very detailed photos can stay above 600 KB at 1920 px: step the
            # longest side down (same quality) until the file fits.
            for side in (MAX_SIDE, 1600, 1440, 1280, 1024):
                img = full.copy()
                img.thumbnail((side, side), Image.Resampling.LANCZOS)
                img = img.convert("RGB")
                # No exif= argument: the EXIF block (and its GPS data) is not written.
                img.save(path, "JPEG", quality=JPEG_QUALITY, progressive=True,
                         optimize=True, icc_profile=icc)
                if path.stat().st_size <= MAX_BYTES:
                    break
        elif fmt == "PNG":
            if img.mode == "RGBA" and img.getchannel("A").getextrema() == (255, 255):
                img = img.convert("RGB")  # fully opaque: the alpha channel is useless
            img.save(path, "PNG", optimize=True, icc_profile=icc)
            if path.stat().st_size > MAX_BYTES:
                img.convert("RGB").quantize(256, method=Image.Quantize.MEDIANCUT).save(
                    path, "PNG", optimize=True)
        else:
            print(f"skipped (format {fmt}): {path}")
            return

    print(f"{path}: {before // 1024} KB -> {path.stat().st_size // 1024} KB, {img.size[0]}x{img.size[1]}")


def main(args):
    if not args:
        sys.exit(__doc__)
    for name in args:
        optimize(Path(name))


if __name__ == "__main__":
    main(sys.argv[1:])
