import Link from "next/link";
type PaginationProps = {
    page: number;
    pageSize: number;
    totalItems: number;
};
const Pagination = ({ page, pageSize, totalItems }: PaginationProps) => {
    const totalPages: number = Math.ceil(totalItems / pageSize);
    const showPrevious = page > 1;
    const showNext = page < totalPages;
    return (
        <section className="container mx-auto flex justify-center my-8">
            {showPrevious && (
                <Link href={`/properties?page=${page - 1}&pageSize=${pageSize}`} className="mr-2 px-2 py-1 border border-gray-300 rounded">
                    Previous
                </Link>
            )}
            <span className="mx-2">
                Page {page} of {totalPages}
            </span>
            {showNext && (
                <Link href={`/properties?page=${page + 1}&pageSize=${pageSize}`} className="ml-2 px-2 py-1 border border-gray-300 rounded">
                    Next
                </Link>
            )}
        </section>
    );
}
export default Pagination;