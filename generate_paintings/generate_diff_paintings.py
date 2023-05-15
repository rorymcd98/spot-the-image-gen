import os
import glob
from PIL import Image
import numpy as np

def generate_diff_paintings(prepaint_directory):
    print('Generating diff paintings...')
    for subdir in os.listdir(prepaint_directory):

        print(f'Processing {subdir}...')

        # Skip non-directories
        subdir_path = os.path.join(prepaint_directory, subdir)
        if not os.path.isdir(subdir_path):
            continue
        
        # Create an output prepaint_directory in the public folder
        out_dir = os.path.join(os.getcwd(), '..', 'public', 'paintings', subdir)
        os.makedirs(out_dir, exist_ok=True)

        # Open original.png and find its aspect ratio
        original_path = os.path.join(subdir_path, 'original.png')
        original = Image.open(original_path)

        # Create output painting
        output_painting_path = os.path.join(out_dir, f'{subdir}-diff.png')
        output_np = np.array(original)

        # Iterate through diff-{letter} and mask-{letter}
        for diff_path in glob.glob(os.path.join(subdir_path, 'diff-*')):
            
            print(f'Processing {diff_path}...')

            # Skip non-files
            mask_path = diff_path.replace('diff-', 'mask-')
            if not os.path.isfile(mask_path):
                continue

            # Open diff and mask
            diff = Image.open(diff_path).convert('RGBA')  # Convert diff to RGBA
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


            #(dev) chat gpt generated this, I'm not totally sure what's happening but it works
            if diff_np.shape[2] == 4 and output_np.shape[2] == 4:
                output_np[transparent_pixels] = diff_np[transparent_pixels]
            elif diff_np.shape[2] == 4 and output_np.shape[2] == 3:
                output_np[transparent_pixels] = diff_np[transparent_pixels][..., :3]
            elif diff_np.shape[2] == 3 and output_np.shape[2] == 4:
                output_np[transparent_pixels][..., :3] = diff_np[transparent_pixels]
            
        output_painting = Image.fromarray(output_np)

        # Also create a tiny painting for progressive loading
        tiny_output_painting_path = os.path.join(out_dir, f'{subdir}-diff-tiny.png')
        tiny_output_painting = output_painting.resize((int(output_painting.size[0]/6), int(output_painting.size[1]/6)))

        # Save output paintings
        output_painting.save(output_painting_path)
        tiny_output_painting.save(tiny_output_painting_path)