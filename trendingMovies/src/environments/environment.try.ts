export const MoviesPlay = {
  nowPlaying: (word: string, num: number) =>
    `https://api.themoviedb.org/3/movie/${word}?api_key=e78eb5f674fe406baa908be829b6d42f&language=en-US&page=${num}`,
  airingToday: (word: string, num: number) =>
    `https://api.themoviedb.org/3/tv/${word}?api_key=e78eb5f674fe406baa908be829b6d42f&language=en-US&page=${num}`,

  tvDetails: (id: string) =>
    `https://api.themoviedb.org/3/tv/${id}?api_key=e78eb5f674fe406baa908be829b6d42f&language=en-US`,

  tvCredits: (id: string) =>
    `https://api.themoviedb.org/3/tv/${id}/credits?api_key=e78eb5f674fe406baa908be829b6d42f&language=en-US`,

  tvSimilar: (id: string, page: number) =>
    `https://api.themoviedb.org/3/tv/${id}/similar?api_key=e78eb5f674fe406baa908be829b6d42f&language=en-US&page=${page}`,

  actors: (page: number) =>
    `https://api.themoviedb.org/3/person/popular?api_key=e78eb5f674fe406baa908be829b6d42f&language=en-US&page=${page}`,

  actorsDetails: (id: string) =>
    `https://api.themoviedb.org/3/person/${id}?api_key=e78eb5f674fe406baa908be829b6d42f&language=en-US`,

  peopleCredit: (id: string) =>
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=e78eb5f674fe406baa908be829b6d42f&language=en-US`,

  peopleSearch: (name: string, page: number) =>
    `https://api.themoviedb.org/3/search/person?api_key=e78eb5f674fe406baa908be829b6d42f&query=${name}&include_adult=false&language=en-US&page=${page}`,

  tvSearch: (name: string) =>
    `https://api.themoviedb.org/3/search/tv?api_key=e78eb5f674fe406baa908be829b6d42f&query=${name}&include_adult=false&language=en-US&page=1`,
};
