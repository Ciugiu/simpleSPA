const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const checkEmail = {
  checkEmpty: (stringEmail: string) => stringEmail !== "",
  checkFormat: (stringEmail: string) => regex.test(stringEmail),
};
