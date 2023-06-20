export const passwordRegex = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@#$%^&():;<>,.?~_+-=|])');
export const emailRegex = new RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)');
export const lettersOnlyRegex = new RegExp('^[a-zA-Z\\s]*$');
