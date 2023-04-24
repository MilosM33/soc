import IProductAttribute from "../IProductAttribute";
export default function Attribute({
  attribute,
}: {
  attribute: IProductAttribute;
}) {


  return (
    <div className="flex justify-between ">
      <div className="group relative">
        <span className="text-gray-500">{attribute.type.name}</span>
        <span className="p-2 absolute bg-black top-full left-1/2 -translate-x-1/2 text-white rounded hidden group-hover:block z-20">
          {attribute.type.description}
        </span>
      </div>
      <div className="group relative">
        <span className="text-gray-500">{attribute.value.value}</span>
        <span className="p-2 absolute bg-black top-full left-1/2 -translate-x-1/2 text-white rounded hidden group-hover:block z-20">
          {attribute.value.description}
        </span>
      </div>
    </div>
  );
}
