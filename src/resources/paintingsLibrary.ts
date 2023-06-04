type Painting = {
    name: string;
    artist: string;
    year: string;
    description: string;
    totalDiffs: number;
    aspectRatio: number;
};

export type PaintingLibrary = {
    [key: string]: Painting;
};

export default {
    'sunday-afternoon': {
        name: 'A Sunday Afternoon on the Island of La Grande Jatte',
        artist: 'Georges Seurat',
        year: '1884-1886',
        description:
            "A Sunday Afternoon on the Island of La Grande Jatte (French: Un dimanche après-midi à l'Île de la Grande Jatte) was painted from 1884 to 1886 and is Georges Seurat's most famous work. A leading example of pointillist technique, executed on a large canvas, it is a founding work of the neo-impressionist movement. Seurat's composition includes a number of Parisians at a park on the banks of the River Seine. It is in the collection of the Art Institute of Chicago.",
        totalDiffs: 11,
        aspectRatio: 1.45833333333,
    },
    'boating-party': {
        name: 'Luncheon of the Boating Party',
        artist: 'Pierre-Auguste Renoir',
        year: '1880-1881',
        description:
            'Luncheon of the Boating Party (1880–1881, French: Le déjeuner des canotiers) is a painting by French impressionist Pierre-Auguste Renoir. Included in the Seventh Impressionist Exhibition in 1882, it was identified as the best painting in the show by three critics. It was purchased from the artist by the dealer-patron Paul Durand-Ruel and bought in 1923 (for $125,000) from his son by industrialist Duncan Phillips, who later donated it to the Phillips Collection in Washington, D.C. It shows a richness of form, a fluidity of brush stroke, and a flickering light.',
        totalDiffs: 7,
        aspectRatio: 1.35458574838,
    },
    // "test": {
    //   "name": "Test",
    //   "artist": "Test",
    //   "year": "Test",
    //   "description": "Test",
    //   "totalDiffs": 3,
    //   "aspectRatio": 0.5
    // }
} as PaintingLibrary;
