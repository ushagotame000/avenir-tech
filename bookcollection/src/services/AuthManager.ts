interface TokenPayload {
  name: string;
  role: string;
  exp: number;
}

export class AuthManager {
  static register(name: string, role: string, password: string) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some(
      (user: { name: string }) => user.name === name
    );

    if (userExists) {
      throw new Error("User already exists. Please use a different name.");
    }

    const newUser = { name, role, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  }

  // Login user
  static login(name: string, password: string) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (u: { name: string; password: string }) =>
        u.name === name && u.password === password
    );

    if (!user) {
      throw new Error("Invalid username or password.");
    }

    const token = this.createToken({
      name,
      role: user.role,
      exp: this.getExpirationTime(),
    });

    localStorage.setItem("userName", name);
    localStorage.setItem("userRole", user.role);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("authToken", token);
  }

  static loginWithGoogle(
    tokenId: string,
    name: string,
    userRole: string
  ): void {
    if (!tokenId) {
      throw new Error("Invalid token. Login failed.");
    }

    // Check if already logged in
    if (
      localStorage.getItem("isLoggedIn") === "true" &&
      localStorage.getItem("userName") === name
    ) {
      throw new Error("This user is already logged in.");
    }

    const token = this.createToken({
      name,
      role: userRole,
      exp: this.getExpirationTime(),
    });

    localStorage.setItem("userName", name);
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("authToken", token);
  }

  // Generate a token with an expiration time
  static createToken(payload: object): string {
    const header = { alg: "HS256", typ: "JWT" };
    const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));
    return `${encodedHeader}.${encodedPayload}`;
  }

  private static getExpirationTime(): number {
    return Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days
  }

  static logout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("authToken");
  }

  // Check if the user is logged in
  static isLoggedIn(): boolean {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return false;
    }

    const decodedPayload = this.decodeToken();
    if (!decodedPayload) {
      return false;
    }

    const payload = decodedPayload as TokenPayload;

    // Check if token is expired
    if (this.isTokenExpired(payload.exp)) {
      this.logout();
      return false;
    }

    const userName = localStorage.getItem("userName");
    const userRole = localStorage.getItem("userRole");
    return payload.name === userName && payload.role === userRole;
  }

  // Check if the token has expired
  private static isTokenExpired(exp: number): boolean {
    const currentTime = Math.floor(Date.now() / 1000);
    return exp < currentTime;
  }

  // Get the username of the logged-in user
  static getUserName(): string | null {
    return localStorage.getItem("userName");
  }

  // Get the role of the logged-in user
  static getUserRole(): string | null {
    return localStorage.getItem("userRole");
  }

  // Decode the token
  static decodeToken(): object | null {
    const token = localStorage.getItem("authToken");
    if (!token) return null;

    try {
      const [, payload] = token.split(".");
      return JSON.parse(this.base64UrlDecode(payload));
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  // Validate token during login
  static validateToken(): boolean {
    const token = localStorage.getItem("authToken");
    if (!token) return false;

    try {
      const decodedPayload = this.decodeToken();
      return decodedPayload !== null;
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  }

  // Helper function: Base64Url encode
  private static base64UrlEncode(input: string): string {
    return btoa(input)
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  }

  // Helper function: Base64Url decode
  private static base64UrlDecode(input: string): string {
    return atob(input.replace(/-/g, "+").replace(/_/g, "/"));
  }
}
