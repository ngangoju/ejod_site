import os
import re

replacements = {
    "cosmic-purple": "brand-orange",
    "7C3AED": "EA580C",
    "7c3aed": "ea580c",
    "124, 58, 237": "234, 88, 12",
    "8B5CF6": "F97316",
    "8b5cf6": "f97316",
    "6d28d9": "c2410c",
    "6D28D9": "C2410C",
    "a78bfa": "fb923c",
    "c4b5fd": "fdba74",
    "glow-purple": "glow-orange"
}

directories = ['pages', 'components', 'styles']
files_to_check = ['tailwind.config.js']

for d in directories:
    for root, dirs, files in os.walk(d):
        for f in files:
            if f.endswith(('.js', '.css', '.tsx')):
                files_to_check.append(os.path.join(root, f))

for file_path in files_to_check:
    if not os.path.exists(file_path): continue
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)
        
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")
