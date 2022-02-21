import { useNavigate } from "remix";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default function Back() {
  const navigate = useNavigate();
  return (
    <a className="text-2xl font-bold text-gray-100 pb-4 pr-4 hover:text-pink-500 cursor-pointer active:text-pink-700 transition-colors duration-200">
      <FaArrowAltCircleLeft
        className=""
        onClick={() => navigate(-1)}
      />
    </a>
  )
}