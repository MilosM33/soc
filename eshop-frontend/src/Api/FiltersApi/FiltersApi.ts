import { get, post } from "../Client";

export const FiltersApi = {
	searchFilters: (data: any) => get(`/filters/search`, { params: data }),
};
