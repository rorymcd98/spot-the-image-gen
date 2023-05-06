import cv2
import numpy as np
import svgwrite
import json
import os

def contour_to_svg(points):
    path_data = 'M' + ' '.join(f'{point[0][0]},{point[0][1]}' for point in points) + ' Z'
    return path_data

def generate_svgs(image_path, painting_name, output_directory, debug=False): 
    full_image_path = f'{image_path}/{painting_name}-mask.png'

    if not os.path.exists(full_image_path):
        return
   
    img = cv2.imread(full_image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY_INV)

    height, width = thresh.shape

    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    os.makedirs(output_directory, exist_ok=True)

    dwg = svgwrite.Drawing(f'diff-{painting_name}.svg', profile='full', viewBox=f'0 0 {width} {height}')

    for idx, contour in enumerate(contours):    
        path = contour_to_svg(contour)
        dwg.add(dwg.path(d=path, fill='#000000', class_='DiffPath diff-' + str(idx)))
    
    dwg.saveas(os.path.join(output_directory, f'diff-{painting_name}.svg'))
    

    

    if debug:
        debug_img = img.copy()
        cv2.drawContours(debug_img, contours, -1, (0, 255, 0), 2)
        cv2.imshow("Contour Visualization", debug_img)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

def find_painting_names(paintings_directory):
    painting_name_list = os.listdir(paintings_directory)
    return painting_name_list
    
def main():
    paintings_directory = "../src/assets/paintings/"
    differences_directory = "../src/assets/differences/"

    painting_name_list = find_painting_names(paintings_directory)

    for painting_name in painting_name_list:
        painting_path = os.path.join(paintings_directory, painting_name)
        if os.path.isdir(painting_path):

            generate_svgs(painting_path, painting_name, differences_directory, False)

if __name__ == "__main__":
    main()
