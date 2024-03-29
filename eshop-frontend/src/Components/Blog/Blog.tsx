import Pagination from "../Pagination/Pagination";
import { BlogApi } from "../../Api/Blog/Blog";
import { useEffect, useState } from "react";
import Skeleton from "../Skeleton/Skeleton";
import { Link } from "react-router-dom";
export default function Blog() {
	const [blogPosts, setBlogPosts] = useState<any>({});

	useEffect(() => {
		BlogApi.getBlogPosts({
			page: 1,
		}).then((res) => {
			setBlogPosts(res.data);
		});
	}, []);

	return (
		<div className="container mx-auto px-4 md:px-0">
			<h1 className="text-2xl text-secondary my-3">News</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
				{blogPosts &&
					blogPosts.data?.map((post: any) => (
						<Link
							className="overflow-hidden rounded-md"
							to={"/blog/" + post.title}
						>
							<img
								src={post.image}
								alt=""
								className="w-full h-32 object-cover"
							/>
							<h1 className="text-xl text-secondary my-3">{post.title}</h1>
							<p className="text-primary">{post.short_text}</p>
						</Link>
					))}

				{blogPosts.data == null &&
					Array(5)
						.fill(0)
						.map((item, index) => {
							return (
								<div
									style={{ height: "150px", overflow: "hidden" }}
									className="w-full mb-2"
								>
									<Skeleton className="w-full aspect-square"></Skeleton>
								</div>
							);
						})}
			</div>

			{blogPosts && blogPosts.data && (
				<Pagination
					Total={blogPosts.last_page}
					currentPage={blogPosts.current_page}
					setPage={(page: number) => {
						BlogApi.getBlogPosts({
							page,
						}).then((res) => {
							setBlogPosts(res.data);
						});
					}}
				></Pagination>
			)}
		</div>
	);
}
