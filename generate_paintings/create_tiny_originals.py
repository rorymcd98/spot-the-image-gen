import os
from PIL import Image

def create_tiny_originals(original_directory):
  for subdir in os.listdir(original_directory):
       
    # Skip non-directories
    subdir_path = os.path.join(original_directory, subdir)
    if not os.path.isdir(subdir_path):
        continue
        
    # Create an output directory in the public folder
    out_dir = os.path.join(os.getcwd(), '..', 'public', 'paintings', subdir)
    os.makedirs(out_dir, exist_ok=True)

    # Open the original.png
    original_path = os.path.join(subdir_path, 'original.png')

    # Create a tiny painting for progressive loading
    original = Image.open(original_path)
    tiny_original = original.resize((int(original.size[0]/6), int(original.size[1]/6)))

    output_painting_path = os.path.join(out_dir, f'{subdir}-tiny.png')

    # Save the output painting
    tiny_original.save(output_painting_path)