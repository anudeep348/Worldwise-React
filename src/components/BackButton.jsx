import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const naviation = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        naviation(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
