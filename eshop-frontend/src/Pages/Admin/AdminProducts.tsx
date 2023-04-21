import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { toast } from "react-toastify";
import { AttributeApi } from "../../Api/AttributeApi/AttributeApi";
import { Product } from "../../Api/Product/Product";
import Button from "../../Components/Forms/Button/Button";
import IconButton from "../../Components/Forms/IconButton/IconButton";
import MultiSearchInput from "../../Components/Forms/SearchInput/MultiSearchInput";
import TextInput from "../../Components/Forms/TextInput/TextInput";
import ValueIncrement from "../../Components/Forms/ValueIncrement/ValueIncrement";
import Modal from "../../Components/Modal/Modal";
import Attribute from "../../Components/Product/AttributeSection/Attribute";
import IProductAttribute from "../../Components/Product/IProductAttribute";
import { BiCategoryAlt } from "react-icons/bi";
import { Category } from "../../Api/Category/Category";

export default function AdminProducts() {
	const [search, setSearch] = useState({
		id: "",
		title: "",
		description: "",
		slug: "",
		is_active: "",
		similar_products: "",
		page: 1,
		show: 10,
	});

	const [data, setData] = useState<any>({
		data: [],
	});
	const [similarProducts, setSimilarProducts] = useState<any>([]);

	const [loading, setLoading] = useState(true);
	const [selectedRow, setSelectedRow] = useState<any>(null);

	const [createProduct, setCreateProduct] = useState<any>({
		show: false,
	});

	function onSearch(newSearch: any) {
		setSearch(newSearch);
		setLoading(true);
		setData({
			data: [],
		});
		Product.filterProducts(newSearch).then((res) => {
			setData(res.data);
			console.log(res.data);
			setLoading(false);
		});
	}

	function openAddProduct() {
		setCreateProduct({ show: true });
	}

	function onCreate(row: any) {
		Product.createProduct(row)
			.then((res) => {
				setCreateProduct({ show: false });
				onSearch(search);
			})
			.then(() => {
				toast.success("Product created");
			});
	}

	function onEdit(row: any) {
		Product.updateProduct(row).then((res) => {
			onSearch(search);
			toast.success("Product updated");
			setSelectedRow(null);
		});
	}

	function onDelete(slug: string) {
		Product.deleteProduct(slug).then((res) => {
			setData({
				data: data.data.filter((item: any) => item.slug !== slug),
			});

			toast.success("Product deleted");
			setSelectedRow(null);
		});
	}

	useEffect(() => {
		setLoading(true);
		Product.filterProducts(search).then((res) => {
			setData(res.data);
			console.log(res.data);
			setLoading(false);
		});
	}, []);

	return (
		<section>
			{selectedRow != null && (
				<Modal
					isOpen={true}
					title={"Edit product"}
					onClose={() => setSelectedRow(null)}
				>
					<div
						className="w-[500px] overflow-y-scroll"
						style={{ maxHeight: "400px" }}
					>
						<TextInput
							placeholder="Title"
							value={selectedRow.title}
							onChange={(e) =>
								setSelectedRow({ ...selectedRow, title: e.target.value })
							}
						></TextInput>
						<div className="my-3">
							<label htmlFor="scales">Is active</label>
							<input
								type="checkbox"
								id="active"
								name="active"
								checked={selectedRow.is_active ?? false}
								onChange={() => {
									setSelectedRow({
										...selectedRow,
										is_active: !selectedRow.is_active ?? false,
									});
								}}
							/>
						</div>

						<TextInput
							placeholder="Slug"
							value={selectedRow.slug}
							onChange={(e) =>
								setSelectedRow({ ...selectedRow, slug: e.target.value })
							}
						></TextInput>

						<MultiSearchInput
							icon={<BiCategoryAlt></BiCategoryAlt>}
							placeholder="Search categories"
							getData={(query: string) =>
								Category.searchCategories({
									name: query,
								}).then((res: AxiosResponse<any>) => res)
							}
							setSelected={(selected: any) => {
								setSelectedRow({
									...selectedRow,
									categories: selected,
								});
							}}
							titleProperty="name"
							selected={selectedRow.categories ?? []}
							onChange={(value: any) => {
								setSelectedRow({
									...selectedRow,
									categories: [...selectedRow.categories, value],
								});
							}}
						></MultiSearchInput>

						<div className="my-3">
							{selectedRow.categories?.map((item: any) => (
								<div className="flex items-center mr-3">
									<span className="mr-2">{item.name}</span>
									<IconButton
										onClick={() => {
											setSelectedRow({
												...selectedRow,
												categories: selectedRow.categories.filter(
													(category: any) => category.id !== item.id
												),
											});

											Product.deleteCategory({
												categoryId: item.id,
												slug: selectedRow.slug,
											});

											toast.success("Category deleted");
										}}
									>
										<AiOutlineClose></AiOutlineClose>
									</IconButton>
								</div>
							))}
						</div>

						<div className="w-48">
							<Button
								variant="primary"
								onClick={() => {
									Product.generateSlug({ slug: selectedRow.title }).then(
										(res) => {
											setSelectedRow({ ...selectedRow, slug: res.data.slug });
										}
									);
								}}
							>
								Generate random slug
							</Button>
						</div>
						<label htmlFor="">Description</label>
						<textarea
							name=""
							id=""
							cols={30}
							rows={10}
							className="bg-gray-100 w-full"
							value={selectedRow.description}
							onChange={(e) =>
								setSelectedRow({ ...selectedRow, description: e.target.value })
							}
						></textarea>

						<MultiSearchInput
							icon={<AiOutlineShoppingCart></AiOutlineShoppingCart>}
							placeholder="Similar products"
							getData={Product.searchProducts}
							setSelected={setSimilarProducts}
							selected={similarProducts}
							onChange={(value: any) => {
								setSelectedRow({
									...selectedRow,
									similar_products: [...similarProducts, value],
								});
							}}
						></MultiSearchInput>
						{similarProducts && similarProducts.length > 0 && (
							<div className="flex flex-wrap my-3">
								{similarProducts.map((item: any) => (
									<div className="flex items-center mr-3">
										<a
											href={
												process.env.REACT_APP_URL + "/products/" + item["slug"]
											}
											target="_blank"
										>
											{item["title"]}
										</a>
										<IconButton
											onClick={() => {
												Product.deleteSimilarProduct({
													slug: selectedRow.slug,
													similar_product: item["slug"],
												}).then((res) => {
													setSimilarProducts(
														similarProducts.filter((i: any) => i.id !== item.id)
													);

													toast.success("Similar product deleted");
												});
											}}
											className="text-sm mx-2"
										>
											<AiOutlineClose></AiOutlineClose>
										</IconButton>
									</div>
								))}
							</div>
						)}
						<p>Attributes:</p>

						<MultiSearchInput
							setSelected={(selected: any) => {
								setSelectedRow({
									...selectedRow,
									attributes: [...selectedRow.attributes, selected],
								});
							}}
							titleProperty="option"
							selected={selectedRow.attributes}
							getData={(text: string) => {
								return AttributeApi.search(text);
							}}
							onChange={(value) => {
								setSelectedRow({
									...selectedRow,
									attributes: [...selectedRow.attributes, value],
								});
							}}
						></MultiSearchInput>
						<div className="w-64">
							{selectedRow.attributes.map(
								(attribute: IProductAttribute, id: number) => (
									<div className="">
										<IconButton
											onClick={() => {
												setSelectedRow({
													...selectedRow,
													attributes: selectedRow.attributes.filter(
														(item: any, _: number) => id !== _
													),
												});

												onSearch(search);
											}}
										>
											<AiOutlineClose></AiOutlineClose>
										</IconButton>
										<Attribute attribute={attribute}></Attribute>
									</div>
								)
							)}
						</div>
						<label htmlFor="">Variants</label>
						<div>
							<Button
								variant="primary"
								onClick={() => {
									setSelectedRow({
										...selectedRow,
										variants: [
											...selectedRow.variants,
											{
												name: "New variant",
												images: [],
												attributes: [],
												price: 0,
											},
										],
									});
								}}
							>
								Add variant
							</Button>
						</div>
						{selectedRow.variants.map((variant: any) => (
							<div className="my-5">
								<div className="flex gap-5">
									<TextInput
										value={variant.name}
										onChange={(e) => {
											setSelectedRow({
												...selectedRow,
												variants: selectedRow.variants.map((v: any) => {
													if (v.id === variant.id) {
														return { ...v, name: e.target.value };
													}
													return v;
												}),
											});
										}}
									></TextInput>
									<div>
										<TextInput
											placeholder="Price"
											value={variant.price}
											onChange={(e) => {
												setSelectedRow({
													...selectedRow,
													variants: selectedRow.variants.map((v: any) => {
														if (v.id === variant.id) {
															return { ...v, price: e.target.value };
														}
														return v;
													}),
												});
											}}
										></TextInput>
									</div>

									<IconButton
										onClick={() => {
											Product.deleteVariant({ id: variant.id })
												.then((res) => {
													onSearch(search);

													setSelectedRow({
														...selectedRow,
														variants: selectedRow.variants.filter(
															(v: any) => v.id !== variant.id
														),
													});

													toast.success("Variant deleted");
												})
												.catch((err) => {
													setSelectedRow({
														...selectedRow,
														variants: selectedRow.variants.filter(
															(v: any) => v.id !== variant.id
														),
													});
												});
										}}
									>
										<AiOutlineClose></AiOutlineClose>
									</IconButton>
								</div>
								<p>Images:</p>
								<div className="flex">
									{variant.images.map((image: any) => (
										<div className="w-32 relative" key={image.id}>
											<img src={image.path} alt="" className="w-32" />

											<IconButton
												onClick={() => {
													Product.deleteImage({ id: image.id }).then((res) => {
														onSearch(search);

														setSelectedRow({
															...selectedRow,
															variants: selectedRow.variants.map((v: any) => {
																if (v.id === variant.id) {
																	return {
																		...v,
																		images: v.images.filter(
																			(i: any) => i.id !== image.id
																		),
																	};
																}
																return v;
															}),
														});

														toast.success("Image deleted");
													});
												}}
												className="absolute top-0 right-0"
											>
												<AiOutlineClose></AiOutlineClose>
											</IconButton>
										</div>
									))}
								</div>
								<input
									type="file"
									name="files[]"
									id=""
									className="my-3"
									multiple
									onChange={(e: any) => {
										const files = e.target.files;

										if (files.length === 0) return;

										const formData = new FormData();
										for (let i = 0; i < files.length; i++) {
											formData.append("files[]", files[i]);
										}
										Product.uploadImages(formData).then((res) => {
											setSelectedRow({
												...selectedRow,
												variants: selectedRow.variants.map((v: any) => {
													if (v.id === variant.id) {
														return {
															...v,
															images: [...v.images, ...res.data.images],
														};
													}
													return v;
												}),
											});
										});
									}}
								/>
								<p>Variant Attributes:</p>

								<MultiSearchInput
									setSelected={(selected: any) => {
										setSelectedRow({
											...selectedRow,
											variants: selectedRow.variants.map((v: any) => {
												if (v.id === variant.id) {
													return {
														...v,
														attributes: [...selected],
													};
												}
												return v;
											}),
										});
									}}
									titleProperty="option"
									selected={variant.attributes}
									getData={(text: string) => {
										return AttributeApi.search(text);
									}}
									onChange={(value) => {
										setSelectedRow({
											...selectedRow,
											variants: selectedRow.variants.map((v: any) => {
												if (v.id === variant.id) {
													return {
														...v,
														attributes: [...v.attributes, value],
													};
												}
												return v;
											}),
										});
									}}
								></MultiSearchInput>

								<div className="w-64">
									{variant.attributes.map(
										(attribute: IProductAttribute, id: number) => (
											<div className="">
												<IconButton
													onClick={() => {
														setSelectedRow({
															...selectedRow,
															variants: selectedRow.variants.map((v: any) => {
																if (v.id === variant.id) {
																	return {
																		...v,
																		attributes: v.attributes.filter(
																			(a: any, _: number) => _ !== id
																		),
																	};
																}
																return v;
															}),
														});

														AttributeApi.removeVariantAttribute(
															attribute.id,
															variant.id
														);

														onSearch(search);
													}}
												>
													<AiOutlineClose></AiOutlineClose>
												</IconButton>
												<Attribute attribute={attribute}></Attribute>
											</div>
										)
									)}
								</div>
							</div>
						))}

						<div className="flex justify-between">
							<Button variant="primary" onClick={() => onEdit(selectedRow)}>
								Update
							</Button>
							<Button
								variant="secondary"
								onClick={() => onDelete(selectedRow.slug)}
							>
								Remove
							</Button>
						</div>
					</div>
				</Modal>
			)}
			{createProduct != null && createProduct.show && (
				<Modal
					isOpen={true}
					title={"Create product"}
					onClose={() => setCreateProduct(null)}
				>
					<div
						className="w-[500px] overflow-y-scroll"
						style={{ maxHeight: "400px" }}
					>
						<TextInput
							placeholder="Title"
							value={createProduct.title}
							onChange={(e) =>
								setCreateProduct({ ...createProduct, title: e.target.value })
							}
						></TextInput>
						<div className="my-3">
							<label htmlFor="scales">Is active</label>
							<input
								type="checkbox"
								id="active"
								name="active"
								checked={createProduct.is_active ?? false}
								onChange={() => {
									setCreateProduct({
										...createProduct,
										is_active: !createProduct.is_active ?? false,
									});
								}}
							/>
						</div>

						<TextInput
							placeholder="Slug"
							value={createProduct.slug}
							onChange={(e) =>
								setCreateProduct({ ...createProduct, slug: e.target.value })
							}
						></TextInput>

						<div className="w-48">
							<Button
								variant="primary"
								onClick={() => {
									Product.generateSlug({ slug: createProduct.title }).then(
										(res) => {
											setCreateProduct({
												...createProduct,
												slug: res.data.slug,
											});
										}
									);
								}}
							>
								Generate random slug
							</Button>
						</div>

						<MultiSearchInput
							icon={<BiCategoryAlt></BiCategoryAlt>}
							placeholder="Search categories"
							getData={(query: string) =>
								Category.searchCategories({
									name: query,
								}).then((res: AxiosResponse<any>) => res)
							}
							setSelected={(selected: any) => {
								setCreateProduct({
									...createProduct,
									categories: selected,
								});
							}}
							titleProperty="name"
							selected={createProduct.categories ?? []}
							onChange={(value: any) => {
								setCreateProduct({
									...createProduct,
									categories: [...createProduct.categories, value],
								});
							}}
						></MultiSearchInput>

						<div className="my-3">
							{createProduct.categories?.map((item: any) => (
								<div className="flex items-center mr-3">
									<span className="mr-2">{item.name}</span>
									<IconButton
										onClick={() => {
											setCreateProduct({
												...createProduct,
												categories: createProduct.categories.filter(
													(category: any) => category.id !== item.id
												),
											});

											Product.deleteCategory({
												categoryId: item.id,
												slug: createProduct.slug,
											});

											toast.success("Category deleted");
										}}
									>
										<AiOutlineClose></AiOutlineClose>
									</IconButton>
								</div>
							))}
						</div>
						<label htmlFor="">Description</label>
						<textarea
							name=""
							id=""
							cols={30}
							rows={10}
							className="bg-gray-100 w-full"
							value={createProduct.description}
							onChange={(e) =>
								setCreateProduct({
									...createProduct,
									description: e.target.value,
								})
							}
						></textarea>

						<MultiSearchInput
							icon={<AiOutlineShoppingCart></AiOutlineShoppingCart>}
							placeholder="Similar products"
							getData={Product.searchProducts}
							setSelected={setSimilarProducts}
							selected={similarProducts}
							onChange={(value: any) => {
								setCreateProduct({
									...createProduct,
									similar_products: [...similarProducts, value],
								});
							}}
						></MultiSearchInput>
						{similarProducts && similarProducts.length > 0 && (
							<div className="flex flex-wrap my-3">
								{similarProducts.map((item: any) => (
									<div className="flex items-center mr-3">
										<a
											href={
												process.env.REACT_APP_URL + "/products/" + item["slug"]
											}
											target="_blank"
										>
											{item["title"]}
										</a>
										<IconButton
											onClick={() => {
												Product.deleteSimilarProduct({
													slug: createProduct.slug,
													similar_product: item["slug"],
												}).then((res) => {
													setSimilarProducts(
														similarProducts.filter((i: any) => i.id !== item.id)
													);

													toast.success("Similar product deleted");
												});
											}}
											className="text-sm mx-2"
										>
											<AiOutlineClose></AiOutlineClose>
										</IconButton>
									</div>
								))}
							</div>
						)}
						<p>Attributes:</p>

						<MultiSearchInput
							setSelected={(selected: any) => {
								setCreateProduct({
									...createProduct,
									attributes: [...createProduct.attributes, selected],
								});
							}}
							titleProperty="option"
							selected={createProduct.attributes}
							getData={(text: string) => {
								return AttributeApi.search(text);
							}}
							onChange={(value) => {
								setCreateProduct({
									...createProduct,
									attributes: [...createProduct.attributes, value],
								});
							}}
						></MultiSearchInput>
						<div className="w-64">
							{createProduct?.attributes?.map(
								(attribute: IProductAttribute, id: number) => (
									<div className="">
										<IconButton
											onClick={() => {
												setCreateProduct({
													...createProduct,
													attributes: createProduct.attributes.filter(
														(item: any, _: number) => id !== _
													),
												});

												onSearch(search);
											}}
										>
											<AiOutlineClose></AiOutlineClose>
										</IconButton>
										<Attribute attribute={attribute}></Attribute>
									</div>
								)
							)}
						</div>
						<label htmlFor="">Variants</label>
						<div>
							<Button
								variant="primary"
								onClick={() => {
									setCreateProduct({
										...createProduct,
										variants: [
											...(createProduct.variants ?? []),
											{
												name: "New variant",
												images: [],
												attributes: [],
												price: 0,
											},
										],
									});
								}}
							>
								Add variant
							</Button>
						</div>
						{createProduct?.variants?.map((variant: any) => (
							<div className="my-5">
								<div className="flex gap-5">
									<TextInput
										value={variant.name}
										onChange={(e) => {
											setCreateProduct({
												...createProduct,
												variants: createProduct.variants.map((v: any) => {
													if (v.id === variant.id) {
														return { ...v, name: e.target.value };
													}
													return v;
												}),
											});
										}}
									></TextInput>
									<div>
										<TextInput
											placeholder="Price"
											value={variant.price}
											onChange={(e) => {
												setCreateProduct({
													...createProduct,
													variants: createProduct.variants.map((v: any) => {
														if (v.id === variant.id) {
															return { ...v, price: e.target.value };
														}
														return v;
													}),
												});
											}}
										></TextInput>
									</div>

									<IconButton
										onClick={() => {
											Product.deleteVariant({ id: variant.id })
												.then((res) => {
													onSearch(search);

													setCreateProduct({
														...createProduct,
														variants: createProduct.variants.filter(
															(v: any) => v.id !== variant.id
														),
													});

													toast.success("Variant deleted");
												})
												.catch((err) => {
													setCreateProduct({
														...createProduct,
														variants: createProduct.variants.filter(
															(v: any) => v.id !== variant.id
														),
													});
												});
										}}
									>
										<AiOutlineClose></AiOutlineClose>
									</IconButton>
								</div>
								<p>Images:</p>
								<div className="flex">
									{variant.images.map((image: any) => (
										<div className="w-32 relative" key={image.id}>
											<img src={image.path} alt="" className="w-32" />

											<IconButton
												onClick={() => {
													Product.deleteImage({ id: image.id }).then((res) => {
														onSearch(search);

														setCreateProduct({
															...createProduct,
															variants: createProduct.variants.map((v: any) => {
																if (v.id === variant.id) {
																	return {
																		...v,
																		images: v.images.filter(
																			(i: any) => i.id !== image.id
																		),
																	};
																}
																return v;
															}),
														});

														toast.success("Image deleted");
													});
												}}
												className="absolute top-0 right-0"
											>
												<AiOutlineClose></AiOutlineClose>
											</IconButton>
										</div>
									))}
								</div>
								<input
									type="file"
									name="files[]"
									id=""
									className="my-3"
									multiple
									onChange={(e: any) => {
										const files = e.target.files;

										if (files.length === 0) return;

										const formData = new FormData();
										for (let i = 0; i < files.length; i++) {
											formData.append("files[]", files[i]);
										}
										Product.uploadImages(formData).then((res) => {
											setCreateProduct({
												...createProduct,
												variants: createProduct.variants.map((v: any) => {
													if (v.id === variant.id) {
														return {
															...v,
															images: [...v.images, ...res.data.images],
														};
													}
													return v;
												}),
											});
										});
									}}
								/>
								<p>Variant Attributes:</p>

								<MultiSearchInput
									setSelected={(selected: any) => {
										setCreateProduct({
											...createProduct,
											variants: createProduct.variants.map((v: any) => {
												if (v.id === variant.id) {
													return {
														...v,
														attributes: [...selected],
													};
												}
												return v;
											}),
										});
									}}
									titleProperty="option"
									selected={variant.attributes}
									getData={(text: string) => {
										return AttributeApi.search(text);
									}}
									onChange={(value) => {
										setCreateProduct({
											...createProduct,
											variants: createProduct.variants.map((v: any) => {
												if (v.id === variant.id) {
													return {
														...v,
														attributes: [...v.attributes, value],
													};
												}
												return v;
											}),
										});
									}}
								></MultiSearchInput>

								<div className="w-64">
									{variant.attributes.map(
										(attribute: IProductAttribute, id: number) => (
											<div className="">
												<IconButton
													onClick={() => {
														setCreateProduct({
															...createProduct,
															variants: createProduct.variants.map((v: any) => {
																if (v.id === variant.id) {
																	return {
																		...v,
																		attributes: v.attributes.filter(
																			(a: any, _: number) => _ !== id
																		),
																	};
																}
																return v;
															}),
														});

														AttributeApi.removeVariantAttribute(
															attribute.id,
															variant.id
														);

														onSearch(search);
													}}
												>
													<AiOutlineClose></AiOutlineClose>
												</IconButton>
												<Attribute attribute={attribute}></Attribute>
											</div>
										)
									)}
								</div>
							</div>
						))}

						<div className="flex justify-between">
							<Button variant="primary" onClick={() => onCreate(createProduct)}>
								Create
							</Button>
							<Button
								variant="secondary"
								onClick={() => {
									setCreateProduct({
										show: false,
									});
								}}
							>
								Close
							</Button>
						</div>
					</div>
				</Modal>
			)}
			<Button onClick={openAddProduct}>Add product</Button>
			<table>
				<thead>
					<tr>
						<th>
							<TextInput
								placeholder="Title"
								onChange={(e) => onSearch({ ...search, title: e.target.value })}
							></TextInput>
						</th>
						<th>
							<TextInput
								placeholder="Slug"
								onChange={(e) => onSearch({ ...search, slug: e.target.value })}
							></TextInput>
						</th>
						<th>
							<TextInput
								placeholder="Is active"
								onChange={(e) =>
									onSearch({ ...search, isactive: e.target.value })
								}
							></TextInput>
						</th>
					</tr>
					<tr>
						<th>Title</th>
						<th>Slug</th>
						<th>Is active</th>
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

					{data.data.length !== 0 &&
						data.data.map((product: any) => (
							<tr
								className=" odd:bg-blue-100 cursor-pointer"
								onContextMenu={(e: any) => {
									e.preventDefault();
									setSelectedRow(product);

									setSimilarProducts(product.similar_products);
								}}
							>
								<td className="p-2">{product.title}</td>
								<td className="p-2">{product.slug}</td>
								<td className="p-2">{product.is_active ? "Yes" : "No"}</td>
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
