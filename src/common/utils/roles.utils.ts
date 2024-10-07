export const matchRoles = (allowedRoles: string[], userRoles: string[]): boolean => {
    return userRoles.some((role) => allowedRoles.includes(role));
};
