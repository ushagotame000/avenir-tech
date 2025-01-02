interface TokenPayload {
  email: string;
  role: string;
  exp: number;
}

export class AuthManager {
  static register(email: string, role: string, password: string) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some(
      (user: { email: string }) => user.email === email
    );

    if (userExists) {
      alert("User already exists. Please use a different email.");
    }

    const newUser = { email, role, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  }

  // Login user
  static login(email: string, password: string) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (u: { email: string; password: string }) =>
        u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid useremail or password.");
    }

    const token = this.createToken({
      email,
      role: user.role,
      exp: this.getExpirationTime(),
    });

    localStorage.setItem("useremail", email);
    localStorage.setItem("userRole", user.role);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("authToken", token);
  }

  static loginWithGoogle(
    tokenId: string,
    email: string,
    userRole: string = "Admin"
  ) {
    if (!tokenId) {
      throw new Error("Invalid token. Login failed.");
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    let user = users.find((u: { email: string }) => u.email === email);

    if (!user) {
      console.log("User not registered. Registering a new user.");
      user = { email, role: userRole };
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
    }

    // Create token
    const tokenPayload = {
      email: user.email,
      role: user.role,
    };

    const token = this.createToken(tokenPayload);

    localStorage.setItem("useremail", user.email);
    localStorage.setItem("userRole", user.role);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("authToken", token);

    console.log("Google login success. Token created and saved:", token);
    console.log("user after google login :", user);
    console.log("role after google login :", localStorage.getItem("userRole"));
  }

  static createToken(payload: object): string {
    const header = { alg: "HS256", typ: "JWT" };
    const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));
    return `${encodedHeader}.${encodedPayload}`;
  }

  private static getExpirationTime(): number {
    return Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
  }

  static logout() {
    localStorage.removeItem("useremail");
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

    const useremail = localStorage.getItem("useremail");
    const userRole = localStorage.getItem("userRole");
    return payload.email === useremail && payload.role === userRole;
  }

  // Check if the token  expired
  private static isTokenExpired(exp: number): boolean {
    const currentTime = Math.floor(Date.now() / 1000);
    return exp < currentTime;
  }

  // Get the useremail oflogged-in user
  static getUseremail(): string | null {
    return localStorage.getItem("useremail");
  }

  // Get the role of logged-in user
  static getUserRole(): string | null {
    return localStorage.getItem("userRole");
  }

  // Decode the token
  // static decodeToken(): object | null {
  //   const token = localStorage.getItem("authToken");
  //   if (!token) return null;

  //   try {
  //     const [, payload] = token.split(".");
  //     return JSON.parse(this.base64UrlDecode(payload));
  //   } catch (error) {
  //     console.error("Error decoding token:", error);
  //     return null;
  //   }
  // }

  static decodeToken(): object | null {
    const token = localStorage.getItem("authToken");
    if (!token) return null;

    try {
      const [, payload] = token.split(".");
      const decodedPayload = JSON.parse(this.base64UrlDecode(payload));
      console.log("Decoded Token Payload:", decodedPayload);
      return decodedPayload;
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
