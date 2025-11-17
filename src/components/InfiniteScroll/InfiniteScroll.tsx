import { ReactNode, useEffect, useRef } from "react";

interface InfiniteScrollProps {
  children: ReactNode;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  loader?: ReactNode;
  rootMargin?: string;
  scrollContainerRef?: React.RefObject<HTMLDivElement>;  // ← NEW
}

const InfiniteScroll = ({
  children,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  loader,
  rootMargin = "200px",
  scrollContainerRef,
}: InfiniteScrollProps) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: scrollContainerRef?.current || null, // ← key difference
        rootMargin,
      }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, scrollContainerRef]);

  return (
    <>
      {children}

      {hasNextPage && (
        <div ref={loaderRef} style={{ textAlign: "center", padding: "20px" }}>
          {loader || "Loading..."}
        </div>
      )}
    </>
  );
};

export default InfiniteScroll;
