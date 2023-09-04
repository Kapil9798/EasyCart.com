import { useNavigate } from "react-router-dom";
import "../directory.style.scss";

const DirectoryItem = (props) => {
  const { title, imageUrl, route } = props.category;
  const navigate = useNavigate();

  const navigationHandler = () => {
    navigate(route);
  };

  return (
    <div className="directory-item-container" onClick={navigationHandler}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
