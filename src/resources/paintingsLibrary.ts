type Painting = {
  name: string;
  arist: string;
  year: string;
  description: string;
  totalDiffs: number;
  aspectRatio: number;
}

export type PaintingLibrary = {
  [key: string]: Painting;
}

export default {
  "sunday-afternoon": {
    "name": "A Sunday Afternoon on the Island of La Grande Jatte",
    "arist": "Georges Seurat",
    "year": "1884-1886",
    "description": "A Sunday Afternoon on the Island of La Grande Jatte (French: Un dimanche après-midi à l'Île de la Grande Jatte) was painted from 1884 to 1886 and is Georges Seurat's most famous work. A leading example of pointillist technique, executed on a large canvas, it is a founding work of the neo-impressionist movement. Seurat's composition includes a number of Parisians at a park on the banks of the River Seine. It is in the collection of the Art Institute of Chicago.",
    "totalDiffs": 10,
    "aspectRatio": 1.45833333333
  }
} as PaintingLibrary;