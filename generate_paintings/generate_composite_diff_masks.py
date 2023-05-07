import os
import glob
from PIL import Image
import numpy as np

from generate_svg import generate_svg

def generate_composite_diff_masks(directory):
    print('Generating composite diff masks...')

    # Create 'out' directory
    current_dir = os.getcwd()
    out_dir = os.path.join(current_dir, '..',  'public', 'diff-svgs')
    os.makedirs(out_dir, exist_ok=True)

    for subdir in os.listdir(directory):

        print(f'Processing {subdir}...')

        # Skip non-directories
        subdir_path = os.path.join(directory, subdir)
        if not os.path.isdir(subdir_path):
            continue

        # Open original.png 
        original_painting_path = os.path.join(subdir_path, 'original.png')
        if not os.path.isfile(original_painting_path):
            continue

        original = Image.open(original_painting_path)

        # Create output painting - white canvas, same size as original
        output_composite = Image.new('RGBA', original.size, (255, 255, 255, 255))

        # Iterate through diff-{letter} and mask-{letter}
        for mask_path in glob.glob(os.path.join(subdir_path, 'mask-*')):
            
            print(f'Processing {mask_path}...')

            # Skip non-files
            if not os.path.isfile(mask_path):
                continue

            # Open mask
            mask = Image.open(mask_path)

            # Resize images if necessary
            if mask.size != original.size:
                mask = mask.resize(original.size)

            # Find transparent area in mask and copy the corresponding area from diff to output_composite
            mask_np = np.array(mask)
            transparent_pixels = (mask_np[..., 3] == 0)
            output_np = np.array(output_composite)
            output_np[transparent_pixels] = (0, 0, 0, 255)
            output_composite = Image.fromarray(output_np)

        numpy_image = np.array(output_composite)

        # Save output painting
        generate_svg(numpy_image, subdir, out_dir, debug=False)
