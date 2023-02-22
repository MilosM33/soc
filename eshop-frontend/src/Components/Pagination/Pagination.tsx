import React from "react";

export default function Pagination({
  Total,
  currentPage,
  setPage,
}: {
  Total: number;
  currentPage: number;
  setPage: Function;
}) {
  const currentButton: string =
    "px-4 py-2 my-2 bg-secondary  rounded-lg text-white";
  const otherButton: string =
    "px-4 py-2 my-2 rounded-lg bg-gray-200 text-gray-500";

  return (
    <section className="flex justify-center gap-2">
      {Array.from({ length: Total }, (_, i) => (
        <button
          className={currentPage === i + 1  ? currentButton : otherButton}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </section>
  );
}
