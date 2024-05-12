from PIL import Image
import os

INPUT = 'SZ/images/' # tego nie wrzucam
OUTPUT = 'SZ/img/'

def main():
    for filename in os.listdir(INPUT):
        im = Image.open(INPUT + filename)
        im = im.crop((650, 100, 1550, 1000))
        im.save(OUTPUT + filename)

if __name__ == '__main__':
    main()