export interface Photo {
  id: string;
  url: string;
  title: string;
  tags: string[];
  likes: number;
  downloads: number;
  views: number;
  photographer?: string;
  dateTaken?: string;
}

export const mockPhotos: Photo[] = [
  {
    id: '1',
    url: '/photo-1.png',
    title: 'Sunset Landscape',
    tags: ['landscape', 'sunset', 'nature'],
    likes: 124,
    downloads: 45,
    views: 1205,
    photographer: 'John Doe',
    dateTaken: '2024-01-15'
  },
  {
    id: '2',
    url: '/photo-2.png',
    title: 'Portrait Study',
    tags: ['portrait', 'studio', 'professional'],
    likes: 89,
    downloads: 23,
    views: 892,
    photographer: 'Jane Smith',
    dateTaken: '2024-01-10'
  },
  {
    id: '3',
    url: '/photo-3.png',
    title: 'Architecture',
    tags: ['architecture', 'building', 'city'],
    likes: 156,
    downloads: 67,
    views: 1543,
    photographer: 'Mike Johnson',
    dateTaken: '2024-01-08'
  },
  {
    id: '4',
    url: '/photo-4.png',
    title: 'Nature Close-up',
    tags: ['macro', 'nature', 'flowers'],
    likes: 203,
    downloads: 89,
    views: 2134,
    photographer: 'Sarah Wilson',
    dateTaken: '2024-01-05'
  },
  {
    id: '5',
    url: '/photo-5.png',
    title: 'Street Photography',
    tags: ['street', 'candid', 'urban'],
    likes: 91,
    downloads: 34,
    views: 765,
    photographer: 'Alex Brown',
    dateTaken: '2024-01-03'
  },
  {
    id: '6',
    url: '/photo-6.png',
    title: 'Wedding Moment',
    tags: ['wedding', 'love', 'ceremony'],
    likes: 267,
    downloads: 112,
    views: 3421,
    photographer: 'Emma Davis',
    dateTaken: '2024-01-01'
  },
  {
    id: '7',
    url: '/photo-7.png',
    title: 'Mountain Vista',
    tags: ['landscape', 'mountain', 'adventure'],
    likes: 189,
    downloads: 78,
    views: 1876,
    photographer: 'David Chen',
    dateTaken: '2023-12-28'
  },
  {
    id: '8',
    url: '/photo-8.png',
    title: 'Urban Nightscape',
    tags: ['night', 'city', 'lights'],
    likes: 234,
    downloads: 95,
    views: 2543,
    photographer: 'Lisa Martinez',
    dateTaken: '2023-12-25'
  },
  {
    id: '9',
    url: '/photo-9.png',
    title: 'Wildlife Portrait',
    tags: ['wildlife', 'nature', 'animal'],
    likes: 312,
    downloads: 143,
    views: 4321,
    photographer: 'Tom Anderson',
    dateTaken: '2023-12-20'
  },
  {
    id: '10',
    url: '/photo-10.png',
    title: 'Coastal Dawn Cliffs',
    tags: ['landscape', 'coast', 'sunrise', 'nature'],
    likes: 228,
    downloads: 84,
    views: 2714,
    photographer: 'Nina Patel',
    dateTaken: '2026-06-18'
  },
  {
    id: '11',
    url: '/photo-11.png',
    title: 'Rainy Crosswalk Portrait',
    tags: ['portrait', 'street', 'rain', 'urban'],
    likes: 173,
    downloads: 59,
    views: 1938,
    photographer: 'Ethan Rivera',
    dateTaken: '2026-05-02'
  },
  {
    id: '12',
    url: '/photo-12.png',
    title: 'Glass Atrium Geometry',
    tags: ['architecture', 'geometry', 'interior', 'modern'],
    likes: 261,
    downloads: 97,
    views: 3186,
    photographer: 'Maya Thompson',
    dateTaken: '2026-03-27'
  }
];
