import { useNavigate } from "react-router";
import Button from "../Forms/Button/Button";

export default function CategoryLink(props: any) {
  const navigate = useNavigate();

  return (
    <div
      className="relative rounded-sm overflow-hidden mb-2"
      style={{
        height: "300px",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-end">
        <div className="w-full p-5">
          <h1 className="text-2xl my-4 text-white uppercase">{props.name}</h1>
          <Button
            variant="primary"
            onClick={() => {
              navigate("category/" + props.slug);
            }}
          >
            Shop now
          </Button>
        </div>
      </div>
      <img
        src={props.image}
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
  );
}
