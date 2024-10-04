export interface DataEntity {
  id: string;
}
export interface Movie extends DataEntity {
  director: string;
}
export interface Song extends DataEntity {
  singer: string;
}

export type DataEntityMap = {
  movie: Movie;
  song: Song;
};

export type DataStoreMethods = {
  [K in keyof DataEntityMap as `getAll${Capitalize<K>}s`]: () => DataEntityMap[K][];
} & {
  [K in keyof DataEntityMap as `get${Capitalize<K>}`]: (
    id: string
  ) => DataEntityMap[K];
} & {
  [K in keyof DataEntityMap as `add${Capitalize<K>}`]: () => void;
} & {
  [K in keyof DataEntityMap as `clear${Capitalize<K>}s`]: () => void;
};

//Typeguard - In this case, it means if I return true, that means x is of type T. If I return false, that means x is not of type T.
function isDefined<T>(x: T | undefined): x is T {
  return typeof x !== "undefined";
}

export class DataStore implements DataStoreMethods {
  /**
   * Record - a dictionary that makes key of type string and the values of type of iterated props from DataEntityMap (Movie and Song )
   * Below -loopthrough all of the keys [movie, song] in data entity map and each of those should have a dictionary
   * and the value type is going to be the interface movie, the interface song..
   */
  #data: { [K in keyof DataEntityMap]: Record<string, DataEntityMap[K]> } = {
    movie: {},
    song: {},
  };

  getAllMovies(): Movie[] {
    return Object.keys(this.#data.movie)
      .map((movieKey) => this.#data.movie[movieKey])
      .filter(isDefined); //Typeguard cause value could be undefined
  }
  getAllSongs(): Song[] {
    return Object.keys(this.#data.song)
      .map((songKey) => this.#data.song[songKey])
      .filter(isDefined); //Typeguard cause value could be undefined
  }
  getMovie(movieKey: string): Movie {
    const movie = this.#data.movie[movieKey];
    if (!movie) throw new Error(`Could not find song with id ${movieKey}`);
    return movie;
  }
  getSong(songKey: string): Song {
    const song = this.#data.song[songKey];
    if (!song) throw new Error(`Could not find song with id ${songKey}`);
    return song;
  }
  addMovie: () => void;
  addSong: () => void;
  clearMovies(): void {
    this.#data.movie = {};
  }
  clearSongs(): void {
    this.#data.song = {};
  }
}

const temp: DataStoreMethods = {} as any;

const ds = new DataStore();
ds.addSong({ id: "song-123", singer: "The Flaming Lips" });
ds.addMovie({
  id: "movie-456",
  director: "Stephen Spielberg",
});
ds.getSong("song-123"); // returns the song
ds.getMovie("movie-456"); // returns the movie
ds.getAllSongs(); // array of all songs
ds.getAllMovies(); // array of all movies
ds.clearSongs(); // clears all songs
ds.clearMovies(); // clears all movies
