"""Offline checks for the student starter download; no model requests."""

import hashlib
import json
from pathlib import Path
import sys
import unittest
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from package_starter import PROJECT, package, starter_files


class DownloadTests(unittest.TestCase):
    """Check the package, model configuration, and unchanged starter boundary."""

    def test_package_exactly_matches_manifest(self) -> None:
        with ZipFile(package()) as archive:
            self.assertEqual(archive.namelist(), [f'reading-list/{name}' for name in starter_files()])
            for name in starter_files():
                self.assertEqual(archive.read(f'reading-list/{name}'), (PROJECT / name).read_bytes())

    def test_package_is_reproducible(self) -> None:
        first = hashlib.sha256(package().read_bytes()).hexdigest()
        self.assertEqual(first, hashlib.sha256(package().read_bytes()).hexdigest())

    def test_no_runtime_or_personal_files(self) -> None:
        for name in starter_files():
            self.assertFalse(set(Path(name).parts) & {'node_modules', '.cache', 'output', '.git'})
            self.assertFalse(Path(name).name.startswith('.env'))
            data = (PROJECT / name).read_text()
            self.assertNotIn('/Users/', data)
            self.assertNotIn('/private/tmp/', data)

    def test_two_model_options_and_no_keys(self) -> None:
        config = json.loads((PROJECT / 'opencode.json').read_text())
        self.assertEqual(config['model'], 'nvidia/z-ai/glm-5.3-flash')
        self.assertEqual(set(config['providers']), {'nvidia', 'deepseek'})
        for provider in config['providers'].values():
            self.assertNotIn('apiKey', provider['settings'])
            self.assertTrue(all(name.endswith('_API_KEY') for name in provider['env']))
        self.assertEqual(config['agents'], {'build': {'steps': 32}, 'plan': {'steps': 8}})

    def test_permission_boundary(self) -> None:
        rules = json.loads((PROJECT / 'opencode.json').read_text())['permissions']
        lookup = {(rule['action'], rule['resource']): rule['effect'] for rule in rules}
        self.assertEqual(lookup['*', '*'], 'deny')
        self.assertEqual(lookup['read', '*'], 'allow')
        self.assertEqual(lookup['edit', '*'], 'ask')
        self.assertEqual(lookup['shell', '*'], 'ask')
        self.assertEqual(lookup['shell', 'npm run browser -- click *'], 'allow')
        self.assertEqual(lookup['shell', 'sudo *'], 'deny')

    def test_browser_is_separate_and_visible(self) -> None:
        config = json.loads((PROJECT / '.playwright/cli.config.json').read_text())
        self.assertTrue(config['browser']['isolated'])
        self.assertFalse(config['browser']['launchOptions']['headless'])


if __name__ == '__main__':
    unittest.main()
