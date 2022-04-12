export const isAdmin = (role) => {
  if (role === "administrator") {
    return true;
  }
  return false;
};

export const isAdminOrDirector = (role) => {
  if (role === "developer" || role === "administrator" || role === "director") {
    return true;
  }
  return false;
};

export const isDirector = (role) => role === "director";

export const isSalesman = (role) => role === "salesman";
