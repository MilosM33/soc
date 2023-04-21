import Layout from "../../Layout/Layout";
import { useEffect, useState } from "react";
import { BlogApi } from "../../Api/Blog/Blog";
import { useParams } from "react-router";
import "./styles.css";
import parse from "html-react-parser";
import Skeleton from "../Skeleton/Skeleton";

export default function BlogPreview() {
	const [blog, setBlog] = useState<any>(null);

	let { title } = useParams();

	useEffect(() => {
		BlogApi.getBlog({ title }).then((res) => {
			setBlog(res.data);
		});
	}, []);

	return (
		<Layout>
			<div className="container mx-auto" id="blogPreview">
				{
					<div>
						<h1 className="text-3xl font-bold my-2">
							{blog?.title || <Skeleton />}
						</h1>
						<div className="text-sm text-gray-400 my-2">
							Autor članku: {blog?.author || <Skeleton />}
						</div>
						<div className="text-sm text-gray-400 my-2">
							Naposledy upravene:{" "}
							{blog?.created_at ? (
								new Date(blog?.created_at).toLocaleString("sk-sk")
							) : (
								<Skeleton />
							)}
						</div>

						<div className="">
							{blog?.content ? parse(blog?.content) : <Skeleton />}
						</div>
					</div>
				}
			</div>
		</Layout>
	);
}
