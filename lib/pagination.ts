type PaginationParams = {
    page?: string;
    pageSize?: string;
};
export function getPagination(params?: PaginationParams) {
    const DEFAULT_PAGE_SIZE = 9;
    const page = Math.max(Number(params?.page || 1), 1);
    const pageSize = Math.max(Number(params?.pageSize || DEFAULT_PAGE_SIZE), 1);

    const skip = (page - 1) * pageSize;
    return {page, pageSize, skip};
}