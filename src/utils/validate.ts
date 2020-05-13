export default class Validate {
  static userIdentifier(input: string) {
    if (!input) {
      return "Username or email is required!";
    } else if (
      !input.includes("@") &&
      !(input && !/.+@.+\..+/.test(input) && input.length >= 6)
    ) {
      return "Username must be at least 6 characters!";
    } else if (input.includes("@") && !(input && /.+@.+\..+/.test(input))) {
      return "Email must be valid!";
    }
  }

  static password(input: string) {
    if (!input) {
      return "Password is required!";
    } else if (input.length < 6) {
      return "Password must be at least 6 characters!";
    } else if (
      input.length >= 6 &&
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*)(+=._-`])([a-zA-Z0-9!@#$%^&*)(+=._-`]+)$/g.test(input)
    ) {
      return "Password must contain at least a Number, Special Character, and Upper-Case Letter!";
    }
  }
}
