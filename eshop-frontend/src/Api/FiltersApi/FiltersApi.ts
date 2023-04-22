import { get, post } from "../Client";

export const FiltersApi = {
	searchFilters: (data: any) => get(`/filters/search`, { params: data }),

	searchFilterType: (data: any) => get(`/filterType/search`, { params: data }),

	createAttributeFilter: (data: any) => post(`/filterType/create`, data),
	updateAttributeFilter: (data: any) => post(`/filterType/update`, data),
	removeAttributeFilter: (data: any) => post(`/filterType/remove`, data),
};
