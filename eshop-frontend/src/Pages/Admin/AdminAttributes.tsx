import { useEffect, useState } from "react";
import TextInput from "../../Components/Forms/TextInput/TextInput";
import ValueIncrement from "../../Components/Forms/ValueIncrement/ValueIncrement";
import { AttributeApi } from "../../Api/AttributeApi/AttributeApi";
import Modal from "../../Components/Modal/Modal";
import MultiSearchInput from "../../Components/Forms/SearchInput/MultiSearchInput";
import Button from "../../Components/Forms/Button/Button";
import { toast } from "react-toastify";
import { create } from "domain";

export default function AdminAttributes() {
	const [search, setSearch] = useState({
		attribute_name: "",
		attribute_value: "",
		page: 1,
		show: 10,
	});

	const [data, setData] = useState<any>([]);
	const [loading, setLoading] = useState(true);
	const [selectedRow, setSelectedRow] = useState<any>(null);

	const [attributeForm, setAttributeForm] = useState<any>({
		show: false,
		attribute_name: "",
		attribute_value: "",
	});

	const [createAttributeForm, setCreateAttributeForm] = useState<any>({
		show: false,
		type: "",
	});

	function onSearch(newSearch: any) {
		setSearch(newSearch);

		AttributeApi.searchAttributes(newSearch).then((res) => {
			setData(res.data);
			setLoading(false);
		});
	}
	function onEdit(row: any) {
		setData([]);
		setLoading(true);
		AttributeApi.updateAttribute(selectedRow).then((res) => {
			setSelectedRow(null);

			onSearch(search);
		});
	}

	function onDelete(row: any) {
		setData([]);
		setLoading(true);
		AttributeApi.deleteAttribute(row.id).then((res) => {
			setSelectedRow(null);

			onSearch(search);

			toast.success("Attribute deleted");
		});
	}

	function onCreate(row: any) {
		setData([]);
		setLoading(true);
		AttributeApi.createAttribute(row).then((res) => {
			setAttributeForm({
				show: false,
				attribute_name: "",
				attribute_value: "",
			});

			onSearch(search);

			toast.success("Attribute created");
		});
	}

	function onCreateType(row: any) {
		setData([]);
		setLoading(true);
		AttributeApi.createAttributeType(row).then((res) => {
			setCreateAttributeForm({
				show: false,
				type: "",
			});

			onSearch(search);

			toast.success("Attribute type created");
		});
	}

	function onCreateValue(row: any) {
		setData([]);
		setLoading(true);
		AttributeApi.createAttributeValue(row).then((res) => {
			setCreateAttributeForm({
				show: false,
				type: "",
			});

			onSearch(search);

			toast.success("Attribute value created");
		});
	}

	useEffect(() => {
		onSearch(search);
	}, [search]);

	return (
		<section>
			{selectedRow != null && (
				<Modal
					isOpen={true}
					onClose={() => setSelectedRow(null)}
					title="Edit Attribute"
				>
					<div
						className="overflow-y-scroll md:w-[500px]"
						style={{ maxHeight: "400px" }}
					>
						<MultiSearchInput
							icon={<div></div>}
							placeholder="Attribute Name"
							getData={() => AttributeApi.searchAttributes(search)}
							setSelected={() => {
								setSelectedRow({
									...selectedRow,
									attribute_name: selectedRow.type.name,
								});
							}}
							selected={selectedRow.attribute_name}
							titleProperty="type.name"
							onChange={(value: any) => {
								setSelectedRow({
									...selectedRow,
									attribute_name: value.type.name,
								});
							}}
						></MultiSearchInput>
						<div className="my-4">
							<MultiSearchInput
								icon={<div></div>}
								placeholder="Attribute Value"
								getData={() => AttributeApi.searchAttributes(search)}
								setSelected={(value: any) => {
									console.log(value);
									setSelectedRow({
										...selectedRow,
										attribute_value: value.value,
									});
								}}
								selected={selectedRow.attribute_value}
								titleProperty="value.value"
								onChange={(value: any) => {
									setSelectedRow({
										...selectedRow,
										attribute_value: value.value,
									});
								}}
							></MultiSearchInput>
						</div>

						<div className="flex justify-between">
							<Button variant="primary" onClick={() => onEdit(selectedRow)}>
								Update
							</Button>
							<Button variant="secondary" onClick={() => onDelete(selectedRow)}>
								Remove
							</Button>
						</div>
					</div>
				</Modal>
			)}

			{attributeForm.show && (
				<Modal
					isOpen={true}
					onClose={() => setAttributeForm({ ...attributeForm, show: false })}
					title="Create Attribute"
				>
					<div
						className=" overflow-y-scroll md:w-[500px]"
						style={{ maxHeight: "400px" }}
					>
						<MultiSearchInput
							icon={<div></div>}
							placeholder="Attribute Name"
							getData={(search: string) =>
								AttributeApi.searchAttributeTypes({ name: search })
							}
							setSelected={(value: any) => {
								setAttributeForm({
									...attributeForm,
									attribute_name: value.name,
								});

								console.log(attributeForm);
							}}
							selected={attributeForm.attribute_name}
							titleProperty="name"
							onChange={(value: any) => {
								setAttributeForm({
									...attributeForm,
									attribute_name: value.name,
								});

								console.log(attributeForm);
							}}
						></MultiSearchInput>
						<div className="my-4">
							<MultiSearchInput
								icon={<div></div>}
								placeholder="Attribute Value"
								getData={(search: string) =>
									AttributeApi.searchAttributeValues({ value: search })
								}
								setSelected={(value: any) => {
									setAttributeForm({
										...attributeForm,
										attribute_value: value.value,
									});
								}}
								selected={attributeForm.attribute_value}
								titleProperty="value"
								onChange={(value: any) => {
									setAttributeForm({
										...attributeForm,
										attribute_value: value.value,
									});
								}}
							></MultiSearchInput>
						</div>

						<div className="flex justify-between">
							<Button variant="primary" onClick={() => onCreate(attributeForm)}>
								Create
							</Button>
							<Button
								variant="secondary"
								onClick={() => onDelete(attributeForm)}
							>
								Remove
							</Button>
						</div>
					</div>
				</Modal>
			)}
			{createAttributeForm.show && createAttributeForm.type == "type" && (
				<Modal
					isOpen={true}
					onClose={() =>
						setCreateAttributeForm({ ...createAttributeForm, show: false })
					}
					title="Create Attribute Type"
				>
					<div
						className="overflow-y-scroll md:w-[500px]"
						style={{ maxHeight: "400px" }}
					>
						<TextInput
							placeholder="Type Name"
							onChange={(e: any) =>
								setCreateAttributeForm({
									...createAttributeForm,
									name: e.target.value,
								})
							}
						></TextInput>
						<TextInput
							placeholder="Type Description"
							onChange={(e: any) =>
								setCreateAttributeForm({
									...createAttributeForm,
									description: e.target.value,
								})
							}
						></TextInput>

						<Button onClick={() => onCreateType(createAttributeForm)}>
							Create
						</Button>
					</div>
				</Modal>
			)}
			{createAttributeForm.show && createAttributeForm.type == "value" && (
				<Modal
					isOpen={true}
					onClose={() =>
						setCreateAttributeForm({ ...createAttributeForm, show: false })
					}
					title="Create Attribute Value"
				>
					<div
						className="overflow-y-scroll md:w-[500px]"
						style={{ maxHeight: "400px" }}
					>
						<TextInput
							placeholder="Value Name"
							onChange={(e: any) =>
								setCreateAttributeForm({
									...createAttributeForm,
									value: e.target.value,
								})
							}
						></TextInput>
						<TextInput
							placeholder="Value Description"
							onChange={(e: any) =>
								setCreateAttributeForm({
									...createAttributeForm,
									description: e.target.value,
								})
							}
						></TextInput>

						<Button onClick={() => onCreateValue(createAttributeForm)}>
							Create
						</Button>
					</div>
				</Modal>
			)}

			<table>
				<thead>
					<tr className="sm:space-x-3">
						<Button
							onClick={() => {
								setAttributeForm({
									...attributeForm,
									show: true,
								});
							}}
						>
							Create Attribute
						</Button>
						<Button
							onClick={() => {
								setCreateAttributeForm({
									...createAttributeForm,
									show: true,
									type: "type",
								});
							}}
						>
							Create Type
						</Button>
						<Button
							onClick={() => {
								setCreateAttributeForm({
									...createAttributeForm,
									show: true,
									type: "value",
								});
							}}
						>
							Create Value
						</Button>
					</tr>
					<tr>
						<th>
							<TextInput
								placeholder="Attribute Name"
								onChange={(e) =>
									onSearch({ ...search, attribute_name: e.target.value })
								}
							></TextInput>
						</th>
						<th>
							<TextInput
								placeholder="Attribute Value"
								onChange={(e) =>
									onSearch({ ...search, attribute_value: e.target.value })
								}
							></TextInput>
						</th>
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
								</tr>
							))}
					{data &&
						data.map((attribute: any) => (
							<tr
								className=" odd:bg-blue-100 cursor-pointer"
								onContextMenu={(e: any) => {
									e.preventDefault();
									setSelectedRow(attribute);
								}}
							>
								<td className="p-2">{attribute.type.name}</td>
								<td className="p-2">{attribute.value.value}</td>
							</tr>
						))}
				</tbody>
			</table>
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
		</section>
	);
}
