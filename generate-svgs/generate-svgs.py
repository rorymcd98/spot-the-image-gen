import cv2
import numpy as np
import svgwrite

def contour_to_svg(points):
    path_data = 'M' + ' '.join(f'{point[0][0]},{point[0][1]}' for point in points) + ' Z'
    return path_data

def generate_svgs(image_path, debug=False):
    # Load image, convert to grayscale and apply threshold
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY_INV)

    # Get image dimensions
    height, width = thresh.shape

    # Find contours
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Create SVG for each contour
    for idx, contour in enumerate(contours):
        dwg = svgwrite.Drawing(f'shape_{idx}.svg', profile='full', viewBox=f'0 0 {width} {height}')
        path = contour_to_svg(contour)
        dwg.add(dwg.path(d=path, fill='#000000'))
        dwg.save()

    # Debugging: Visualize contours on the original image
    if debug:
        debug_img = img.copy()
        cv2.drawContours(debug_img, contours, -1, (0, 255, 0), 2)
        cv2.imshow("Contour Visualization", debug_img)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

# Example usage
generate_svgs("test.png", debug=True)
