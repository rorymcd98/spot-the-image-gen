import os
import glob
from PIL import Image
import numpy as np

def generate_diff_paintings(directory):
    for subdir in os.listdir(directory):

        print(f'Processing {subdir}...')

        # Skip non-directories
        subdir_path = os.path.join(directory, subdir)
        if not os.path.isdir(subdir_path):
            continue
        
        # Create an output directory in the public folder
        out_dir = os.path.join(os.getcwd(), '..', 'public', 'paintings', subdir)
        os.makedirs(out_dir, exist_ok=True)

        # Open original.png and find its aspect ratio
        original_path = os.path.join(subdir_path, 'original.png')
        original = Image.open(original_path)

        # Create output painting
        output_painting_path = os.path.join(out_dir, f'{subdir}-diff.png')


        # Iterate through diff-{letter} and mask-{letter}
        for diff_path in glob.glob(os.path.join(subdir_path, 'diff-*')):
            
            print(f'Processing {diff_path}...')

            # Skip non-files
            mask_path = diff_path.replace('diff-', 'mask-')
            if not os.path.isfile(mask_path):
                continue

            # Open diff and mask
            diff = Image.open(diff_path).convert('RGB')  # Convert diff to RGB
            mask = Image.open(mask_path)

            # Resize images if necessary
            if diff.size != original.size:
                diff = diff.resize(original.size)
            if mask.size != original.size:
                mask = mask.resize(original.size)

            # Find transparent area in mask and copy the corresponding area from diff to output_painting
            diff_np = np.array(diff)
            mask_np = np.array(mask)
            transparent_pixels = (mask_np[..., 3] == 0)
            output_np = np.array(original)
            output_np[transparent_pixels] = diff_np[transparent_pixels]
            
        output_painting = Image.fromarray(output_np)

        # Save output painting
        output_painting.save(output_painting_path)