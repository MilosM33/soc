import { useEffect, useState } from "react";
import { FiltersApi } from "../../Api/FiltersApi/FiltersApi";
import TextInput from "../../Components/Forms/TextInput/TextInput";
import ValueIncrement from "../../Components/Forms/ValueIncrement/ValueIncrement";

export default function AdminFilters() {
	const [search, setSearch] = useState({
		attribute_type: "",
		filter_type: "",
		page: 1,
		show: 10,
	});

	const [data, setData] = useState<any>();
	const [loading, setLoading] = useState(true);
	const [selectedRow, setSelectedRow] = useState<any>(null);

	function onSearch(newSearch: any) {
		setLoading(true);
		setData({
			data: [],
		});
		FiltersApi.searchFilters(newSearch).then((res) => {
			setData(res.data);
			setLoading(false);
		});
	}

	useEffect(() => {
		onSearch(search);
	}, []);
	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>
							<TextInput
								placeholder="Attribute Type"
								onChange={(e) =>
									onSearch({ ...search, attributeType: e.target.value })
								}
							></TextInput>
						</th>
						<th>
							<TextInput
								placeholder="Filter Type"
								onChange={(e) =>
									onSearch({ ...search, filterType: e.target.value })
								}
							></TextInput>
						</th>
					</tr>
					<tr>
						<th>Attribute Type</th>
						<th>Filter Type</th>
					</tr>
				</thead>
				<tbody>
					{loading &&
						Array(10)
							.fill(0)
							.map((_, i) => (
								<tr className="odd:bg-blue-100 animate-pulse">
									<td className="px-2 text-transparent select-none">loading</td>
									<td className="px-2 text-transparent select-none">loading</td>
									<td className="px-2 text-transparent select-none">loading</td>
									<td className="px-2 text-transparent select-none">loading</td>
								</tr>
							))}

					{data &&
						data.data.length !== 0 &&
						data.data.map((filter: any) => (
							<tr
								className=" odd:bg-blue-100 cursor-pointer"
								onContextMenu={(e: any) => {
									e.preventDefault();
									setSelectedRow(filter);
								}}
							>
								<td className="p-2">{filter.attribute_type.name}</td>
								<td className="p-2">{filter.filter_type}</td>
							</tr>
						))}
				</tbody>
			</table>

			{data && (
				<>
					<div className="my-2">
						Page {search.page} of {data.last_page} Go to page:
						<ValueIncrement
							value={search.page}
							onChange={(value: number) => {
								if (value < 1) {
									value = 1;
								}
								if (value > data.last_page) {
									value = data.last_page;
								}
								onSearch({ ...search, page: value });
							}}
						></ValueIncrement>
					</div>
					<div className="my-3">
						Show:{" "}
						<ValueIncrement
							value={search.show}
							onChange={(value: number) => {
								if (value < 1) {
									value = 1;
								}
								onSearch({ ...search, show: value });
							}}
						></ValueIncrement>
					</div>
				</>
			)}
		</div>
	);
}
