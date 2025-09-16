#!/usr/bin/env python3
import os
import time

def scan_directory(path, prefix=""):
    files = os.listdir(path)
    files.sort()
    for i, file in enumerate(files):
        full_path = os.path.join(path, file)
        connector = "└── " if i == len(files) - 1 else "├── "
        print(prefix + connector + file, end="")

        if os.path.isfile(full_path):
            size = os.path.getsize(full_path)
            mtime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(os.path.getmtime(full_path)))
            print(f"  [size: {size} bytes | modified: {mtime}]")
        else:
            print("/")
            new_prefix = prefix + ("    " if i == len(files) - 1 else "│   ")
            scan_directory(full_path, new_prefix)

if __name__ == "__main__":
    root_dir = "."  # current folder
    print(f"Project structure for: {os.path.abspath(root_dir)}\n")
    scan_directory(root_dir)

