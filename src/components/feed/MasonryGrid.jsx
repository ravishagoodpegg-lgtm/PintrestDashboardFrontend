import Masonry from "react-masonry-css";

const breakpointCols = {
  default: 4,
  1200: 3,
  900: 2,
  600: 1,
};

export default function MasonryGrid({ children }) {
  return (
    <Masonry
      breakpointCols={breakpointCols}
      className="flex gap-6"
      columnClassName="space-y-6"
    >
      {children}
    </Masonry>
  );
}
