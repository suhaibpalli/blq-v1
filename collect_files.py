import os
from pathlib import Path

def aggregate_files(root_dir, output_file, ignore_dirs=None, ignore_extensions=None):
    if ignore_dirs is None:
        ignore_dirs = {'.git', 'node_modules', '__pycache__', '.next', '.venv'}
    if ignore_extensions is None:
        ignore_extensions = {'.png', '.jpg', '.jpeg', '.gif', '.ico', '.pdf', '.zip', '.exe'}

    root_path = Path(root_dir)
    output_path = Path(output_file)

    with open(output_path, 'w', encoding='utf-8') as outfile:
        # Walk through the directory recursively
        for path in root_path.rglob('*'):
            # Skip the output file itself
            if path.resolve() == output_path.resolve():
                continue
            
            # Skip directories
            if path.is_dir():
                continue
                
            # Skip ignored directories in the path
            if any(part in ignore_dirs for part in path.parts):
                continue
                
            # Skip ignored extensions
            if path.suffix.lower() in ignore_extensions:
                continue

            try:
                # Get relative path for the heading
                relative_path = path.relative_to(root_path)
                
                # Write heading
                outfile.write(f"\n{'='*80}\n")
                outfile.write(f"FILE: {relative_path}\n")
                outfile.write(f"{'='*80}\n\n")
                
                # Write content
                with open(path, 'r', encoding='utf-8', errors='ignore') as infile:
                    outfile.write(infile.read())
                    outfile.write("\n")
                
                print(f"Processed: {relative_path}")
            except Exception as e:
                print(f"Error reading {path}: {e}")

if __name__ == "__main__":
    # Settings
    current_directory = os.getcwd()
    target_output = "project_contents.txt"
    
    print(f"Aggregating files in: {current_directory}")
    aggregate_files(current_directory, target_output)
    print(f"\nDone! All contents written to {target_output}")
