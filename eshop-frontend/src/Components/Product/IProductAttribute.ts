export default interface IProductAttribute {
  id: number;
  type: {
    name: string;
    description: string;
  };
  value: {
    value: string;
    description: string;
  };
}
