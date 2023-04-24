import { useState, useEffect, useRef } from "react";
import Button from "../../Components/Forms/Button/Button";
import TextInput from "../../Components/Forms/TextInput/TextInput";
import ValueIncrement from "../../Components/Forms/ValueIncrement/ValueIncrement";
import { BlogApi } from "../../Api/Blog/Blog";
import Modal from "../../Components/Modal/Modal";
import ReactQuill from "react-quill";
import { ImageApi } from "../../Api/ImageApi/ImageApi";
import { toast } from "react-toastify";
import React from "react";

export default function AdminBlog() {
	const [search, setSearch] = useState({
		title: "",
		modified_date: "",
		page: 1,
		show: 10,
	});
	const quillRef = useRef(null);
	const [data, setData] = useState<any>({
		data: [],
	});
	const [loading, setLoading] = useState(true);
	const [selectedRow, setSelectedRow] = useState<any>(null);
	const [createBlog, setCreateBlog] = useState<any>({
		show: false,
	});

	var quillObj: any;
	var quillObj1: any;
	function onSearch(newSearch: any) {
		setSearch(newSearch);

		setLoading(true);

		setData({
			data: [],
		});

		BlogApi.searchBlogPosts(newSearch).then((res) => {
			setData(res.data);
			setLoading(false);
		});
	}

	function onCreateBlog(row: any) {
		BlogApi.createBlog(row).then((res) => {
			onSearch(search);
			setCreateBlog({});

			toast.success("Blog created");
		});
	}
	function onEditBlog(row: any) {
		BlogApi.updateBlog(row).then((res) => {
			onSearch(search);

			setSelectedRow(null);
			toast.success("Blog updated");
		});
	}

	function onRemoveBlog(row: any) {
		BlogApi.removeBlog({
			id: row.id,
		}).then((res) => {
			onSearch(search);
			setSelectedRow(null);

			toast.success("Blog removed");
		});
	}

	const modules = React.useMemo(
		() => ({
			toolbar: {
				container: [
					[{ header: "1" }, { header: "2" }, { font: [] }],
					[{ size: [] }],
					["bold", "italic", "underline", "strike", "blockquote"],
					[
						{ list: "ordered" },
						{ list: "bullet" },
						{ indent: "-1" },
						{ indent: "+1" },
					],
					["link", "image"],
					["clean"],
				],
			},
		}),
		[]
	);

	useEffect(() => {
		onSearch(search);
	}, []);

	return (
		<section>
			{createBlog && createBlog.show && (
				<Modal
					isOpen={true}
					title={"Create blog"}
					onClose={() => {
						setCreateBlog(null);
					}}
				>
					<div className="overflow-hidden md:w-96">
						<TextInput
							placeholder="Blog title"
							onChange={(e: any) => {
								setCreateBlog({
									...createBlog,
									title: e.target.value,
								});
							}}
						></TextInput>
						<TextInput
							placeholder="Short text"
							onChange={(e: any) => {
								setCreateBlog({
									...createBlog,
									short_text: e.target.value,
								});
							}}
						></TextInput>
						<div className="my-3">
							<p>Image cover</p>
							<input
								type="file"
								onChange={(e: any) => {
									const formData = new FormData();

									const file = e.target.files[0];
									formData.append("file", file);

									ImageApi.uploadImage(formData).then((res) => {
										setCreateBlog({
											...createBlog,
											thumbnailUrl: res.data.url,
										});
									});
								}}
							/>
						</div>

						<ReactQuill
							ref={(el) => {
								quillObj1 = el;
							}}
							modules={modules}
							style={{
								height: 350,
								overflow: "hidden",
							}}
							onChange={(data: any) => {
								console.log(data);

								setCreateBlog({
									...createBlog,
									content: data,
								});
							}}
						></ReactQuill>

						<Button onClick={() => onCreateBlog(createBlog)}>Create</Button>
					</div>
				</Modal>
			)}
			{selectedRow && (
				<Modal
					isOpen={true}
					title={"Edit blog"}
					onClose={() => {
						setSelectedRow(null);
					}}
				>
					<div className=" overflow-hidden md:w-96">
						<TextInput
							placeholder="Blog title"
							value={selectedRow.title}
							onChange={(e: any) => {
								setSelectedRow({
									...selectedRow,
									title: e.target.value,
								});
							}}
						></TextInput>
						<TextInput
							placeholder="Short text"
							value={selectedRow.short_text}
							onChange={(e: any) => {
								setSelectedRow({
									...selectedRow,
									short_text: e.target.value,
								});
							}}
						></TextInput>
						<div className="my-3">
							<p>Image cover</p>
							<input type="file" />
						</div>

						<ReactQuill
							ref={(el) => {
								quillObj1 = el;
							}}
							modules={modules}
							style={{
								height: 350,
								overflow: "hidden",
							}}
							value={selectedRow.content}
							onChange={(data: any) => {
								setSelectedRow({
									...selectedRow,
									content: data,
								});
							}}
						></ReactQuill>

						<Button onClick={() => onEditBlog(selectedRow)} className="mx-2">
							Update
						</Button>
						<Button
							onClick={() => onRemoveBlog(selectedRow)}
							variant="secondary"
						>
							Remove
						</Button>
					</div>
				</Modal>
			)}
			<table>
				<thead>
					<tr className="space-x-3">
						<Button
							onClick={() => {
								setCreateBlog({
									show: true,
								});
							}}
						>
							Create Blog
						</Button>
					</tr>
					<tr>
						<th>
							<TextInput
								placeholder="Blog Title"
								onChange={(e) => {}}
							></TextInput>
						</th>
						<th>
							<TextInput
								placeholder="Modified Date"
								onChange={(e) => {}}
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
						data.data.map((blog: any) => (
							<tr
								className=" odd:bg-blue-100 cursor-pointer"
								onContextMenu={(e: any) => {
									e.preventDefault();
									setSelectedRow(blog);
								}}
							>
								<td className="p-2">{blog.title}</td>
								<td className="p-2">
									{new Date(blog.created_at).toLocaleString("sk-sk")}
								</td>
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
						//onSearch({ ...search, page: value });
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
						//onSearch({ ...search, show: value });
					}}
				></ValueIncrement>
			</div>
		</section>
	);
}
