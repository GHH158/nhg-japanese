#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
NHG Japanese Platform - Scene Correction CLI Utility
Allows developers or users to permanently merge dialogue corrections into src/data/scenes.js.
Usage:
    python3 scripts/apply_scene_correction.py <scene_id> <path_to_patch_json>
    python3 scripts/apply_scene_correction.py scene-1 new_dialogue.json
"""

import sys
import os
import json
import re

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCENES_FILE = os.path.join(BASE_DIR, "src", "data", "scenes.js")

def main():
    if len(sys.argv) < 3:
        print("Usage: python3 scripts/apply_scene_correction.py <scene-id> <patch.json>")
        print("Example: python3 scripts/apply_scene_correction.py scene-1 ./corrected_scene1.json")
        sys.exit(1)

    scene_id = sys.argv[1].strip()
    patch_file = sys.argv[2].strip()

    if not os.path.exists(patch_file):
        print(f"Error: patch file {patch_file} does not exist.")
        sys.exit(1)

    with open(patch_file, "r", encoding="utf-8") as f:
        patch_data = json.load(f)

    if not os.path.exists(SCENES_FILE):
        print(f"Error: scenes file {SCENES_FILE} does not exist.")
        sys.exit(1)

    with open(SCENES_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    prefix = "export const KNOWLEDGE_BASE = "
    if not content.startswith(prefix):
        print("Error: Could not locate export const KNOWLEDGE_BASE in scenes.js")
        sys.exit(1)

    raw_json = content[len(prefix):].rstrip().rstrip(";")
    kb = json.loads(raw_json)

    scenes = kb.get("scenes", [])
    target_scene = None
    for s in scenes:
        if s.get("id") == scene_id:
            target_scene = s
            break

    if not target_scene:
        print(f"Error: Scene with id '{scene_id}' not found in KNOWLEDGE_BASE.scenes.")
        sys.exit(1)

    # Patch target_scene
    if isinstance(patch_data, list):
        # Treated as dialogue list
        target_scene["textbookText"]["dialogue"] = patch_data
        target_scene["textbookText"]["audioText"] = " ".join(item.get("jp", "") for item in patch_data)
        print(f"Successfully updated dialogue ({len(patch_data)} turns) for {scene_id}.")
    elif isinstance(patch_data, dict):
        if "dialogue" in patch_data:
            target_scene["textbookText"]["dialogue"] = patch_data["dialogue"]
            target_scene["textbookText"]["audioText"] = " ".join(item.get("jp", "") for item in patch_data["dialogue"])
        if "practicePassages" in patch_data:
            target_scene["practicePassages"] = patch_data["practicePassages"]
        print(f"Successfully updated scene {scene_id}.")

    # Write back
    updated_content = prefix + json.dumps(kb, ensure_ascii=False, indent=2) + ";\n"
    with open(SCENES_FILE, "w", encoding="utf-8") as f:
        f.write(updated_content)

    print(f"Successfully saved permanent correction to {SCENES_FILE}!")

if __name__ == "__main__":
    main()
