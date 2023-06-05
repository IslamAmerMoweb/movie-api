export interface Movies {
  backdrop_path: string;
  poster_path?: string;
  title: string;
  release_date?: string;
  overview: string;
  status: string;
  original_language: string;
  budget: string;
  name?: string;
  last_air_date?: string;
  revenue: string;
  id?: string;
}

export interface tvDetails {
  backdrop_path: string;
  poster_path: string;
  overview: string;
  status: string;
  production_countries: { name: string };
  original_language: string;
  budget: string;
  name?: string;
  last_air_date?: string;
  revenue: string;
  id?: string;
}

export interface credit {
  character: string;
  name: string;
}

export interface review {
  avatar_path?: string;
  username?: string;
  content?: string;
  updated_at?: string;
}

export interface media {
  key: string;
  name: string;
}

export interface similar {
  poster_path: string;
  id: string;
}

export interface actors {
  name: string;
  profile_path: string;
  known_for_department: string;
  id?: string;
}

export interface Playing {
  backdrop_path: object;
}

export interface people {
  profile_path: string;
  biography: string;
  name: string;
  place_of_birth: string;
  known_for_department: string;
}

export interface credit {
  poster_path: string;
  id: string;
  title: string;
  vote_average: number;
}
export interface list {
  listName: string;
  _id: string;
  count: string;
  imageList: string;
}

export interface listItem {
  poster_path: string;
  overview: string;
  id: string;
}
