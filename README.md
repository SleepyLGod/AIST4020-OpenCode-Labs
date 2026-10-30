# AIST4020 OpenCode Labs

English, student-facing labs using OpenCode to improve a small website.
Currently includes **Lab 1: Getting Started with OpenCode**: install and connect,
explore a website, then plan, implement, and check a feature.

## Preview locally

Maintainers need Ruby 3.3+, Bundler, and Python 3.10+. Students do not need these
website-building tools.

```sh
bundle install
python3 scripts/package_starter.py
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

Open <http://127.0.0.1:4000/> for the **lesson**. The Reading List **application**
runs separately at <http://127.0.0.1:4175/>.

## Check locally

```sh
python3 -m unittest discover -s tests -v
bundle exec jekyll build
python3 scripts/check_site.py _site
bundle exec jekyll build --baseurl /AIST4020-OpenCode-Labs --destination _site-prefix
python3 scripts/check_site.py _site-prefix --baseurl /AIST4020-OpenCode-Labs
```

`scripts/starter-files.txt` is the explicit download manifest. Regenerate the ZIP
after changing the starter; do not add dependency directories or run outputs.

## Publish with GitHub Pages

The site uses the [Just the Docs template](https://github.com/just-the-docs/just-the-docs-template).
Site links use Jekyll's `relative_url`; `baseurl` is empty for local preview.
In the repository's **Settings > Pages**, choose **GitHub Actions** as the source.
The **Deploy course website** workflow tests the starter, creates its ZIP,
builds the site, checks links, and deploys it. Run it from the Actions tab or push
to `main`.

The workflow reads the Pages URL and repository prefix from GitHub, rather than
hard-coding an account. After forking, enable Actions and select the same Pages
source, then run the workflow in your fork.

Local teacher records are not tracked. Jekyll excludes the starter source and
maintainer scripts from the website; students download the explicitly packaged
ZIP. Screenshot provenance is recorded in [assets/lab-01/SOURCES.md](assets/lab-01/SOURCES.md).
Historical screenshots are not a new end-to-end test of the current prompts.
