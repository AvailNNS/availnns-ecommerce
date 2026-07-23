export const isOtpExpired = (
  expiresAt: Date
): boolean => {
  return Date.now() > expiresAt.getTime();
};