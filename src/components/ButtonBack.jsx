import { useNavigate } from "react-router-dom";
import Button from "./Button";

function ButtonBack({ onClick }) {
  return (
    <Button type="back" onClick={onClick}>
      ← Back
    </Button>
  );
}

export default ButtonBack;
