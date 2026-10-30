"""Build the student download from an explicit, checked file list."""

from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / 'projects/reading-list'


def starter_files() -> list[str]:
    """Return safe, unique paths from the download manifest."""
    names = [line.strip() for line in (ROOT / 'scripts/starter-files.txt').read_text().splitlines()
             if line.strip() and not line.startswith('#')]
    if len(names) != len(set(names)):
        raise ValueError('Duplicate paths in starter manifest')
    for name in names:
        path = Path(name)
        if path.is_absolute() or '..' in path.parts or not (PROJECT / path).is_file():
            raise ValueError(f'Invalid starter file: {name}')
        if not (PROJECT / path).resolve().is_relative_to(PROJECT.resolve()):
            raise ValueError(f'File escapes project: {name}')
    return names


def package() -> Path:
    """Create a deterministic ZIP with the project as its top-level folder."""
    target = ROOT / 'downloads/reading-list-starter.zip'
    target.parent.mkdir(parents=True, exist_ok=True)
    with ZipFile(target, 'w', ZIP_DEFLATED) as archive:
        for name in starter_files():
            info = ZipInfo(f'reading-list/{name}', date_time=(2026, 10, 30, 0, 0, 0))
            info.compress_type = ZIP_DEFLATED
            info.external_attr = 0o100644 << 16
            archive.writestr(info, (PROJECT / name).read_bytes())
    return target


if __name__ == '__main__':
    print(package())
