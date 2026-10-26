// Each validator returns an error string, or '' when the value is valid.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const validateName = (v) => {
  const s = v.trim();
  if (!s) return 'Name is required';
  if (s.length < 2) return 'Name must be at least 2 characters';
  return '';
};

export const validateEmail = (v) => {
  const s = v.trim();
  if (!s) return 'Email is required';
  if (!EMAIL_RE.test(s)) return 'Enter a valid email address';
  return '';
};

// Login only needs "not empty"; signup enforces strength.
export const validateLoginPassword = (v) => (!v ? 'Password is required' : '');

export const validateNewPassword = (v) => {
  if (!v) return 'Password is required';
  if (v.length < 8) return 'Use at least 8 characters';
  if (!/[A-Za-z]/.test(v) || !/\d/.test(v)) return 'Include at least one letter and one number';
  return '';
};

export const validateConfirm = (password, confirm) => {
  if (!confirm) return 'Please confirm your password';
  if (password !== confirm) return 'Passwords do not match';
  return '';
};

// Run a map of { field: errorString } and report whether everything passed.
export const hasErrors = (errors) => Object.values(errors).some(Boolean);
