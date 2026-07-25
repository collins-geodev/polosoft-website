import zipfile, os

os.chdir(r"F:\PoloSoft Redesigned Websites")

with zipfile.ZipFile("polosoft-website.zip", "w", zipfile.ZIP_DEFLATED) as zf:
    zf.write("index.html")
    for folder in ["css", "js", "images"]:
        for root, dirs, files in os.walk(folder):
            for f in files:
                filepath = os.path.join(root, f).replace(os.sep, "/")
                zf.write(filepath)

with zipfile.ZipFile("polosoft-website.zip", "r") as zf:
    for n in zf.namelist():
        print(n)
