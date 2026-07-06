from PIL import Image

def create_favicon():
    img_path = 'assets/icon/icon-Bisa-Academy.png'
    out_path = 'assets/icon/favicon.ico'
    try:
        img = Image.open(img_path)
        icon_sizes = [(32, 32)]
        img.save(out_path, format='ICO', sizes=icon_sizes)
        print(f"Successfully saved favicon to {out_path}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    create_favicon()
