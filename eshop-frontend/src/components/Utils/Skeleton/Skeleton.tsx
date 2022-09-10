import React from "react";
export default function Skeleton(props: any) {
  function SkeletonImage() {
    return (
      <div className="w-full aspect-square bg-gradient-to-r from-gray-200 via-gray-200 to-gray-300 transition-all animate-skeleton animate-d"></div>
    );
  }

  function SkeletonTitle() {
    return (
      <div className="w-full h-8 bg-gradient-to-r from-gray-200 via-gray-200 to-gray-300 transition-all animate-skeleton animate-d"></div>
    );
  }
  function SkeletonText() {
    return (
      <div className="space-y-4">
        <div className="w-full h-4 bg-gradient-to-r from-gray-200 via-gray-200 to-gray-300 transition-all animate-skeleton animate-d"></div>
        <div className="w-full h-4 bg-gradient-to-r from-gray-200 via-gray-200 to-gray-300 transition-all animate-skeleton animate-d"></div>
      </div>
    );
  }

  switch (props.type) {
    case "image":
      return <SkeletonImage />;

    case "title":
      return <SkeletonTitle />;
    case "text":
      return <SkeletonText />;
    default:
      return <SkeletonImage />;
  }
}
