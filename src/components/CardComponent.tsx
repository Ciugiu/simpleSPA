import PlaceholderImage from "../assets/300x200.jpg";

interface CardComponentProps {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

const cardComponent = ({
  title,
  description,
  price,
  imageUrl,
}: CardComponentProps) => {
  return (
    <article className="col">
      <div className="card shadow-sm">
        <img
          src={imageUrl || PlaceholderImage}
          className="card-img-top"
          alt={title}
          style={{ height: "380px", objectFit: "contain" }}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">{price}$</p>
          <div className="d-flex justify-content-end align-items-center">
            <div className="">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default cardComponent;
