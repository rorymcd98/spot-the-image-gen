from generate_composite_diff_masks import generate_composite_diff_masks
from generate_diff_paintings import generate_diff_paintings 
from copy_original import copy_original

if __name__ == '__main__':
  directory_name = "./pre-paintings"
  
  generate_composite_diff_masks(directory_name)
  generate_diff_paintings(directory_name)
  copy_original(directory_name)