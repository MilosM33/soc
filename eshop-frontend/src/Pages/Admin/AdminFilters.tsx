import { useEffect, useState } from "react";
import { FiltersApi } from "../../Api/FiltersApi/FiltersApi";
import TextInput from "../../Components/Forms/TextInput/TextInput";
import ValueIncrement from "../../Components/Forms/ValueIncrement/ValueIncrement";
import Button from "../../Components/Forms/Button/Button";
import Modal from "../../Components/Modal/Modal";
import SearchInput from "../../Components/Forms/SearchInput/SearchInput";
import { AttributeApi } from "../../Api/AttributeApi/AttributeApi";
import { toast } from "react-toastify";

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

	const [createFilters, setCreateFilters] = useState<any>(null);

	function onSearch(newSearch: any) {
		setLoading(true);
		setSearch(newSearch);
		setData({
			data: [],
		});
		FiltersApi.searchFilters(newSearch).then((res) => {
			setData(res.data);
			setLoading(false);
		});
	}

	function createFilter() {
		setCreateFilters({
			show: true,
		});
	}

	function onCreateFilter() {
		FiltersApi.createAttributeFilter({
			attribute_type_id: createFilters.attributeId,
			filter_type: createFilters.filter_type,
		}).then((res) => {
			setCreateFilters(null);
			onSearch(search);

			toast.success("Filter created");
		});
	}

	function onEditFilter() {
		FiltersApi.updateAttributeFilter(selectedRow).then((res) => {
			setSelectedRow(null);
			onSearch(search);

			toast.success("Filter created");
		});
	}

	function onRemoveFilter() {
		FiltersApi.removeAttributeFilter(selectedRow).then((res) => {
			setCreateFilters(null);
			onSearch(search);
			setSelectedRow(null);
			toast.success("Filter removed");
		});
	}

	useEffect(() => {
		onSearch(search);
	}, []);
	return (
		<section>
			<Button onClick={createFilter}>Create filter</Button>

			{createFilters != null && (
				<Modal
					isOpen={true}
					title={"Create filter"}
					onClose={() => setCreateFilters(null)}
				>
					<div className="w-[500px] overflow-y-scroll">
						<SearchInput
							placeholder="Attribute Type"
							titleProperty="name"
							getData={(search: any) =>
								AttributeApi.searchAttributeTypes({ name: search })
							}
							onChange={(value) => {
								setCreateFilters({
									...createFilters,
									attributeId: value.id,
								});
							}}
						></SearchInput>
						<div className="my-3">
							<SearchInput
								placeholder="Filter type"
								titleProperty="filter_type"
								getData={(search: any) =>
									FiltersApi.searchFilterType({ filterType: search })
								}
								onChange={(value) => {
									setCreateFilters({
										...createFilters,
										...value,
									});
								}}
							></SearchInput>
						</div>

						<div className="my-3">
							<Button onClick={onCreateFilter}>Create Filter</Button>
						</div>
					</div>
				</Modal>
			)}
			{selectedRow != null && (
				<Modal
					isOpen={true}
					title={"Edit filter"}
					onClose={() => setSelectedRow(null)}
				>
					<div className="w-[500px] overflow-y-scroll">
						<SearchInput
							placeholder="Attribute Type"
							titleProperty="name"
							getData={(search: any) =>
								AttributeApi.searchAttributeTypes({ name: search })
							}
							value={selectedRow.attribute_type.name}
							onChange={(value) => {
								setSelectedRow({
									...selectedRow,
									attribute_type_id: value.id,
								});
							}}
						></SearchInput>
						<div className="my-3">
							<SearchInput
								placeholder="Filter type"
								titleProperty="filter_type"
								getData={(search: any) =>
									FiltersApi.searchFilterType({ filterType: search })
								}
								value={selectedRow.filter_type}
								onChange={(value) => {
									setSelectedRow({
										...selectedRow,
										...value,
									});
								}}
							></SearchInput>
						</div>

						<div className="my-3">
							<Button onClick={onEditFilter} className="mx-2">
								Update Filter
							</Button>
							<Button onClick={onRemoveFilter} variant="secondary">
								Remove Filter
							</Button>
						</div>
					</div>
				</Modal>
			)}
			<div>
				<table>
					<thead>
						<tr>
							<th>
								<TextInput
									placeholder="Attribute Type"
									onChange={(e) =>
										onSearch({ ...search, attribute_type: e.target.value })
									}
								></TextInput>
							</th>
							<th>
								<TextInput
									placeholder="Filter Type"
									onChange={(e) =>
										onSearch({ ...search, filter_type: e.target.value })
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
										<td className="px-2 text-transparent select-none">
											loading
										</td>
										<td className="px-2 text-transparent select-none">
											loading
										</td>
										<td className="px-2 text-transparent select-none">
											loading
										</td>
										<td className="px-2 text-transparent select-none">
											loading
										</td>
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
		</section>
	);
}
