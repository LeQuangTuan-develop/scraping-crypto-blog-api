module.exports = {
  email: (value) => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value),
  phone: (value) => /^\d{10,12}$/.test(value),
};
