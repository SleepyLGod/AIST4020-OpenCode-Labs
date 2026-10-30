"""Check local links, anchors, and downloads in a built Jekyll site."""

import argparse
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit


class Page(HTMLParser):
    """Collect link targets and fragment identifiers without executing HTML."""

    def __init__(self, source: str) -> None:
        super().__init__()
        self.links: list[str] = []
        self.ids: set[str] = set()
        self.feed(source)

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        if attributes.get('id'):
            self.ids.add(attributes['id'])
        for key in ('href', 'src'):
            if attributes.get(key):
                self.links.append(attributes[key])


def check(root: Path, baseurl: str) -> int:
    """Return the number of broken internal links in a generated site."""
    pages = {path: Page(path.read_text()) for path in root.rglob('*.html')}
    if not pages:
        raise ValueError(f'No HTML pages in {root}')
    errors: list[str] = []
    count = 0
    for path, page in pages.items():
        relative = path.relative_to(root).as_posix()
        current_url = f'{baseurl}/{relative}'
        for link in page.links:
            url = urlsplit(urljoin(current_url, link))
            if url.scheme or url.netloc:
                continue
            count += 1
            target_path = unquote(url.path)
            if baseurl:
                if not target_path.startswith(f'{baseurl}/'):
                    errors.append(f'{relative}: link escapes site prefix: {link}')
                    continue
                target_path = target_path[len(baseurl):]
            target = root / target_path.lstrip('/')
            if target.is_dir():
                target /= 'index.html'
            if not target.is_file():
                errors.append(f'{relative}: missing target: {link}')
            elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
                errors.append(f'{relative}: missing anchor: {link}')
    for excluded in ('projects', 'teacher', 'scripts', 'tests'):
        if (root / excluded).exists():
            errors.append(f'Private source folder was copied into site: {excluded}')
    for error in errors:
        print(error)
    print(f'{len(pages)} HTML pages, {count} internal links, {len(errors)} errors')
    return len(errors)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('site', type=Path)
    parser.add_argument('--baseurl', default='')
    args = parser.parse_args()
    raise SystemExit(bool(check(args.site.resolve(), args.baseurl.rstrip('/'))))
