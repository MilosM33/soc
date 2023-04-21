import { get, post } from "../Client";

export const AttributeApi = {
  search: (query: string) => get(`/attributes/search`, { params: { query } }),
  searchValues: (query: string) =>
    get(`/attributes/values/search`, { params: { query } }),

  create: (attribute: any) => post(`/attributes`, attribute),

  removeVariantAttribute: (id: number, variantId: number) =>
    post(`/attributes/remove`, {
      id,
      variantId,
    }),

  searchAttributes: (data: any) => get(`/attributes/filter`, { params: data }),

  updateAttribute: (data: any) => post(`/attributes/update`, data),

  deleteAttribute: (id: number) => post(`/attributes/delete`, { id }),

  createAttribute: (data: any) => post(`/attributes/create`, data),

  createAttributeType: (data: any) => post(`/attributes/type/create`, data),

  searchAttributeTypes: (data: any) => get(`/attributes/types/filter`, { params: data }),

  createAttributeValue: (data: any) => post(`/attributes/value/create`, data),

  searchAttributeValues: (data: any) => get(`/attributes/values/filter`, { params: data }),
};
