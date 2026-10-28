function ShowCard({ show }) {
  return (
    <div className="show-card">
      {show.image?.medium ? (
        <img src={show.image.medium} alt={show.name} />
      ) : (
        <div className="no-image">No Image Available</div>
      )}

      <div className="show-info">
        <h3>{show.name}</h3>

        <p>
          <strong>Genre:</strong>{" "}
          {show.genres.length > 0
            ? show.genres.join(", ")
            : "Not available"}
        </p>

        <p>
          <strong>Rating:</strong>{" "}
          {show.rating.average ?? "Not rated"}
        </p>

        <p>
          <strong>Status:</strong> {show.status}
        </p>

        <a
          href={show.url}
          target="_blank"
          rel="noreferrer"
        >
          View Details
        </a>
      </div>
    </div>
  );
}

export default ShowCard;