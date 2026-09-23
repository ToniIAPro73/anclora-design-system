#!/usr/bin/env python3
"""Build the canonical HTML manual source."""
from pathlib import Path
import runpy

root = Path(__file__).resolve().parents[1]
runpy.run_path(str(root / "source" / "build.py"), run_name="__main__")
