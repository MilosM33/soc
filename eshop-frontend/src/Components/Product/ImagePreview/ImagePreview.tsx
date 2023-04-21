import React from "react";
import { useState } from "react";

export default function ImagePreview(props: { images: string[] }) {
	const [currentImage, setCurrentImage] = useState(true);
	function onMouseEnter(e: any) {
		if (props.images[1] == undefined) return;

		console.log(props.images)
		setCurrentImage(false);
	}

	function onMouseExit(e: any) {
		setCurrentImage(true);
	}

	return (
		<section onMouseEnter={onMouseEnter} onMouseLeave={onMouseExit}>
			<img
				src={props.images[0]}
				alt=""
				className={
					"w-full aspect-square object-cover rounded-lg " +
					(currentImage ? "" : "hidden")
				}
				loading="lazy"
			/>

			<img
				src={props.images[1]}
				alt=""
				className={
					"w-full aspect-square object-cover rounded-lg " +
					(currentImage ? "hidden" : "")
				}
				loading="lazy"
			/>
		</section>
	);
}
