export const environment = {
  baseUrl: 'https://route-ecommerce.onrender.com/api/v1/auth/',
  trend: (trend: string, num: number = 1) =>
    `https://api.themoviedb.org/3/trending/${trend}/week?language=en-US&page=${num}&api_key=e78eb5f674fe406baa908be829b6d42f`,
  details: (id: string) =>
    `https://api.themoviedb.org/3/movie/${id}?api_key=e78eb5f674fe406baa908be829b6d42f&language=en-US`,

  images: (id: string) =>
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=e78eb5f674fe406baa908be829b6d42f`,

  credit: (id: string) =>
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=e78eb5f674fe406baa908be829b6d42f&language=en-US`,

  basReview: (id: string) =>
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=e78eb5f674fe406baa908be829b6d42f&language=en-US&page=1`,

  video: (id: string) =>
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=e78eb5f674fe406baa908be829b6d42f&language=en-US`,

  similar: (id: string) =>
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=e78eb5f674fe406baa908be829b6d42f&language=en-US&page=1`,

  baseList: 'http://localhost:2000/app/',
};
