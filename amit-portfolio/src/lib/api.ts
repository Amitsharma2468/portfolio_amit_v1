const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.0.107:5000";

class ApiClient {
  private token: string | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("adminToken");
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("adminToken", token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("adminToken");
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}/api${endpoint}`;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.token) {
      (headers as Record<string, string>)[
        "Authorization"
      ] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      // Try to parse error message, fallback to generic
      let errorMessage = "API request failed";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // Ignore JSON parse errors
      }
      throw new Error(errorMessage);
    }

    // If response has content, parse json, otherwise return null
    if (response.status !== 204) {
      return response.json();
    }
    return null;
  }

  // Auth methods
  async login(email: string, password: string) {
    const data = await this.request("/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    this.setToken(data.token);
    return data;
  }

  // Generic CRUD methods
  async getAll(resource: string) {
    return this.request(`/${resource}`);
  }

  async create<T>(resource: string, data: T) {
    return this.request(`/${resource}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async update<T>(resource: string, id: string, data: T) {
    return this.request(`/${resource}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete(resource: string, id: string) {
    return this.request(`/${resource}/${id}`, {
      method: "DELETE",
    });
  }

  // Contact methods
  async sendContact(data: { name: string; email: string; message: string }) {
    return this.request("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient();
