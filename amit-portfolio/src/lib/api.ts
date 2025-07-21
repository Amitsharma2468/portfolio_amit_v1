const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

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

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    // Debug log
    console.log("➡️ Fetching:", url);
    console.log("➡️ With headers:", headers);
    if (options.body) {
      console.log("➡️ With body:", options.body);
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        let errorMessage = "API request failed";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.error("❌ Failed to parse error body", e);
        }
        throw new Error(errorMessage);
      }

      if (response.status !== 204) {
        return response.json();
      }
      return null;
    } catch (error) {
      console.error("❌ Fetch error:", error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    const data = await this.request("/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    this.setToken(data.token);
    return data;
  }

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

  async sendContact(data: { name: string; email: string; message: string }) {
    return this.request("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient();
