from PIL import Image
import os

INPUT = 'images/' # tego nie wrzucam
OUTPUT = 'img/'

def main():
    for filename in os.listdir(INPUT):
        im = Image.open(INPUT + filename)
        im = im.crop((500, 500, 1400, 1400))
        im.save(OUTPUT + filename)

if __name__ == '__main__':
    main()