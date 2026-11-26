#!/usr/bin/env python3
"""Export the CEP slide deck to images for the portfolio's /cep/ page.

Reads   assets/cep/PEVERELLI_CEP_slides.pdf
Writes  assets/images/projects/cep/slide-1.png ... slide-5.png  (~1600 px wide)
        assets/images/projects/cep/cep-poster.png               (page 4, ~2000 px wide)

If a PNG is larger than 600 KB, a JPEG (quality 85) is written instead
and the PNG is removed; the script then prints the file names to use in
pages/cep.md, so update the links there if the extension changed.

Usage (from the repository root, after editing the deck):
    pip install pymupdf
    python3 tools/export_cep_images.py
"""

from pathlib import Path

import pymupdf  # PyMuPDF

ROOT = Path(__file__).resolve().parent.parent
DECK = ROOT / "assets" / "cep" / "PEVERELLI_CEP_slides.pdf"
OUT_DIR = ROOT / "assets" / "images" / "projects" / "cep"

SLIDE_WIDTH = 1600   # target width of each slide image, in pixels
POSTER_WIDTH = 2000  # target width of the poster image, in pixels
POSTER_PAGE = 4      # the poster is page 4 of the deck (1-based)
MAX_BYTES = 600 * 1024
JPEG_QUALITY = 85


def render(page, width_px, stem):
    """Render one PDF page at the given width and save it as PNG (or JPEG if too heavy)."""
    zoom = width_px / page.rect.width
    pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), alpha=False)

    png = OUT_DIR / f"{stem}.png"
    jpg = OUT_DIR / f"{stem}.jpg"
    pix.save(png)

    if png.stat().st_size > MAX_BYTES:
        pix.save(jpg, jpg_quality=JPEG_QUALITY)
        png.unlink()
        out = jpg
    else:
        if jpg.exists():  # remove a stale JPEG from a previous run
            jpg.unlink()
        out = png

    print(f"{out.relative_to(ROOT)}  {pix.width}x{pix.height}  {out.stat().st_size // 1024} KB")
    return out


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    doc = pymupdf.open(DECK)
    print(f"{DECK.relative_to(ROOT)}: {doc.page_count} pages")

    for i, page in enumerate(doc, start=1):
        render(page, SLIDE_WIDTH, f"slide-{i}")

    render(doc[POSTER_PAGE - 1], POSTER_WIDTH, "cep-poster")
    doc.close()


if __name__ == "__main__":
    main()
