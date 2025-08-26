// Role constants
export const ROLES = {
  USER: "user",
  ADMIN: "admin",
};

// Check if user has specific role
export const hasRole = (user, role) => {
  return user?.role === role;
};

// Check if user is admin
export const isAdmin = (user) => {
  return hasRole(user, ROLES.ADMIN);
};

// Check if user is regular user
export const isUser = (user) => {
  return hasRole(user, ROLES.USER);
};

// Get user role or default to 'user'
export const getUserRole = (user) => {
  return user?.role || ROLES.USER;
};

// Check if user can access admin features
export const canAccessAdmin = (user) => {
  return isAdmin(user);
};
