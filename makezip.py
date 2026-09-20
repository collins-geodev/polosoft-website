import zipfile, os

# Package whatever folder this script lives in, so the zip always matches
# the copy of the site you are actually editing.
os.chdir(os.path.dirname(os.path.abspath(__file__)))

with zipfile.ZipFile("polosoft-website.zip", "w", zipfile.ZIP_DEFLATED) as zf:
    for f in ["index.html", "favicon.ico"]:
        zf.write(f)
    for folder in ["css", "js", "images"]:
        for root, dirs, files in os.walk(folder):
            for f in files:
                filepath = os.path.join(root, f).replace(os.sep, "/")
                zf.write(filepath)

with zipfile.ZipFile("polosoft-website.zip", "r") as zf:
    for n in zf.namelist():
        print(n)
