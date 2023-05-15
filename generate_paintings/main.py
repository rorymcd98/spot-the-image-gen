from generate_composite_diff_masks import generate_composite_diff_masks
from generate_diff_paintings import generate_diff_paintings 
from copy_originals import copy_originals
from create_tiny_originals import create_tiny_originals

if __name__ == '__main__':
  prepaint_directory = "./pre-paintings"
  
  generate_composite_diff_masks(prepaint_directory)
  generate_diff_paintings(prepaint_directory)
  copy_originals(prepaint_directory)
  create_tiny_originals(prepaint_directory)