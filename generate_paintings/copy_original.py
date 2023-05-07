import os
import shutil

def copy_original(original_directory):
  for subdir in os.listdir(original_directory):
       
    # Skip non-directories
    subdir_path = os.path.join(original_directory, subdir)
    if not os.path.isdir(subdir_path):
        continue
        
    # Create an output directory in the public folder
    out_dir = os.path.join(os.getcwd(), '..', 'public', 'paintings', subdir)
    os.makedirs(out_dir, exist_ok=True)

    # Copy the original.png to the output file, renaming it to {subdir}.png
    original_path = os.path.join(subdir_path, 'original.png')
    output_painting_path = os.path.join(out_dir, f'{subdir}.png')

    # os.system(f'copy {original_path} {output_painting_path}')
    shutil.copyfile(original_path, output_painting_path)

