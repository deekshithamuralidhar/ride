/**
 * Generate a random alphanumeric password
 * @param {number} length - Length of the password (default: 8)
 * @returns {string} - Generated alphanumeric password
 */
export const generatePassword = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};
