---
name: resize-images
description: Resize images into large, medium, small, and thumbnail variants using Python and Pillow.
---

# Resize Images

Use this skill to generate resized image variants from a single image file or an image directory.

## What it does

- Uses only Python + Pillow
- Accepts an input file or input directory
- Preserves aspect ratio
- Supports `.png`, `.jpg`, `.jpeg`, and `.webp`
- Writes output to `images/resized` by default
- Supports named sizes: `large`, `medium`, `small`, `thumbnail`

## Files

- `.github/skills/resize-images/resize_images.py`

## Size presets

- `large`: `1920x1920`
- `medium`: `1280x1280`
- `small`: `640x640`
- `thumbnail`: `320x320`

Each preset defines a max bounding box. Aspect ratio is preserved.

## Usage

From the repository root:

```bash
python3 .github/skills/resize-images/resize_images.py --input images/source/photo.jpg
```

Resize every supported image in a directory (recursive):

```bash
python3 .github/skills/resize-images/resize_images.py --input images/source
```

Set a custom output directory:

```bash
python3 .github/skills/resize-images/resize_images.py --input images/source --output assets/generated
```

Generate only selected sizes:

```bash
python3 .github/skills/resize-images/resize_images.py --input images/source --sizes medium,thumbnail
```

Overwrite existing generated files:

```bash
python3 .github/skills/resize-images/resize_images.py --input images/source --overwrite
```
