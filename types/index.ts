import { emailRegex } from "@/constants/regex";

declare global {
  interface String {
    isValidEmail(): boolean;
  }
}

String.prototype.isValidEmail = function (): boolean {
  const str = String(this).toLowerCase().match(emailRegex);

  return str !== null;
};

export { };

