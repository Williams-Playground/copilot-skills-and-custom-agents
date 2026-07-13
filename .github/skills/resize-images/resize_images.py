from __future__ import annotations

import argparse
import sys
from pathlib import Path

from PIL import Image

SUPPORTED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}
SIZE_PRESETS: dict[str, tuple[int, int]] = {
    "large": (1920, 1920),
    "medium": (1280, 1280),
    "small": (640, 640),
    "thumbnail": (320, 320),
}


def parse_sizes(value: str) -> list[str]:
    sizes: list[str] = []
    for part in value.split(","):
        name = part.strip().lower()
        if not name:
            continue
        if name not in SIZE_PRESETS:
            valid = ", ".join(SIZE_PRESETS.keys())
            raise argparse.ArgumentTypeError(
                f"Unsupported size '{name}'. Valid values: {valid}"
            )
        if name not in sizes:
            sizes.append(name)
    if not sizes:
        raise argparse.ArgumentTypeError("At least one size must be provided.")
    return sizes


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Resize images into preset variants using Python and Pillow."
    )
    parser.add_argument(
        "--input",
        required=True,
        help="Path to an input image file or a directory containing images.",
    )
    parser.add_argument(
        "--output",
        default="images/resized",
        help="Output directory for generated images (default: images/resized).",
    )
    parser.add_argument(
        "--sizes",
        type=parse_sizes,
        default=list(SIZE_PRESETS.keys()),
        help=(
            "Comma-separated sizes to generate. "
            "Available: large, medium, small, thumbnail."
        ),
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Overwrite existing files in the output directory.",
    )
    return parser


def discover_images(input_path: Path) -> tuple[list[Path], Path]:
    if input_path.is_file():
        if input_path.suffix.lower() not in SUPPORTED_EXTENSIONS:
            raise ValueError(
                f"Unsupported input file extension '{input_path.suffix}'. "
                f"Supported: {', '.join(sorted(SUPPORTED_EXTENSIONS))}"
            )
        return [input_path], input_path.parent

    if input_path.is_dir():
        images = sorted(
            path
            for path in input_path.rglob("*")
            if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS
        )
        if not images:
            raise ValueError(f"No supported images found in directory: {input_path}")
        return images, input_path

    raise ValueError(f"Input path does not exist: {input_path}")


def save_resized_variants(
    image_path: Path,
    base_input_dir: Path,
    output_dir: Path,
    sizes: list[str],
    overwrite: bool,
) -> None:
    relative_image_path = image_path.relative_to(base_input_dir)

    with Image.open(image_path) as image:
        for size_name in sizes:
            max_size = SIZE_PRESETS[size_name]
            resized = image.copy()
            resized.thumbnail(max_size, Image.Resampling.LANCZOS)

            destination = output_dir / size_name / relative_image_path
            destination.parent.mkdir(parents=True, exist_ok=True)

            if destination.exists() and not overwrite:
                print(f"Skipping existing file: {destination}")
                continue

            if destination.suffix.lower() in {".jpg", ".jpeg"} and resized.mode in {
                "RGBA",
                "LA",
                "P",
            }:
                resized = resized.convert("RGB")

            resized.save(destination)
            print(f"Saved: {destination}")


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()

    input_path = Path(args.input).expanduser().resolve()
    output_dir = Path(args.output).expanduser().resolve()
    sizes = args.sizes

    try:
        images, base_input_dir = discover_images(input_path)
    except ValueError as error:
        parser.error(str(error))
        return 2

    output_dir.mkdir(parents=True, exist_ok=True)

    for image_path in images:
        save_resized_variants(
            image_path=image_path,
            base_input_dir=base_input_dir,
            output_dir=output_dir,
            sizes=sizes,
            overwrite=args.overwrite,
        )

    print(f"Processed {len(images)} image(s).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
