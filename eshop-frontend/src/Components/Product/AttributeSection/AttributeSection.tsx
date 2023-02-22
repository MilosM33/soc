import IProductAttribute from "../../Product/IProductAttribute";
import Skeleton from "../../Skeleton/Skeleton";
import Attribute from "./Attribute";

export default function AttributeSection({
  attributes,
}: {
  attributes: IProductAttribute[];
}) {
  if (attributes.length === 0) {
    return null;
  }

  return (
    <>
      <h1 className="text-2xl text-primary uppercase my-3">
        Product parameters
      </h1>
      <section className="w-full md:w-1/2 mx-auto space-y-4">
        {attributes.map((attribute: IProductAttribute) => (
          <Attribute attribute={attribute}></Attribute>
        ))}
      </section>
    </>
  );
}
