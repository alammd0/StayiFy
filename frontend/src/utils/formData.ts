export const formatDate = (dateString: string): string => {
    const options = { day: "numeric", month: "long", year: "numeric" } as const;
    return new Date(dateString).toLocaleDateString("en-US", options);
};