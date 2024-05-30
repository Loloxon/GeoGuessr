from PIL import Image
import os

INPUT = 'images/' # tego nie wrzucam
OUTPUT = 'img/'

def main():
    for filename in os.listdir(INPUT):
        im = Image.open(INPUT + filename)
        im = im.crop((10, 10, 910, 910))
        im.save(OUTPUT + filename)

if __name__ == '__main__':
    main()