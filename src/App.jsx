import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ShowCard from "./components/ShowCard";
import "./App.css";

function App() {
  const [shows, setShows] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchShows() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://api.tvmaze.com/shows?page=0"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch TV shows.");
        }

        const data = await response.json();

        setShows(data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchShows();
  }, []);

  const genres = [
    "All",
    ...new Set(shows.flatMap((show) => show.genres)),
  ];

  const filteredShows = shows.filter((show) => {
    const matchesSearch = show.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      genre === "All" || show.genres.includes(genre);

    return matchesSearch && matchesGenre;
  });

  return (
    <div className="app">
      <Header />

      <main className="container">
        <SearchBar search={search} setSearch={setSearch} />

        <div className="filter-container">
          <label htmlFor="genre">Filter by genre:</label>

          <select
            id="genre"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
          >
            {genres.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {loading && <p className="message">Loading shows...</p>}

        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <>
            <h2>Explore TV Shows</h2>

            <p className="results-count">
              {filteredShows.length} shows found
            </p>

            <div className="shows-grid">
              {filteredShows.map((show) => (
                <ShowCard key={show.id} show={show} />
              ))}
            </div>

            {filteredShows.length === 0 && (
              <p className="message">
                No shows found. Try another search.
              </p>
            )}
          </>
        )}
      </main>

      <footer className="footer">
        <p>
          TV data provided by{" "}
          <a
            href="https://www.tvmaze.com"
            target="_blank"
            rel="noreferrer"
          >
            TVmaze
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
