export const hasPermission = (perms, requiredPerms) => {
  if (!perms || !requiredPerms) return false;

  return requiredPerms.every((requiredPerm) =>
    perms.some(
      (perm) =>
        (perm.name === requiredPerm.name &&
          perm.entityType === requiredPerm.entityType) ||
        (perm.name === "All" && perm.entityType === "Admin")
    )
  );
};

export const checkPerm = (perms, requiredPerm) => {
  if (!perms || !requiredPerm) return false;
  for (let perm of perms) {
    if (
      (perm.name === requiredPerm.name &&
        perm.entityType === requiredPerm.entityType) ||
      (perm.name === "All" && perm.entityType === "Admin")
    ) {
      return true;
    }
  }
  return false;
};


