export class ApiClient {
  url: string | undefined;
  constructor() {
    this.url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/";
  }

  async get(url: string, token: string | undefined) {
    const result = await fetch(`${this.url}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      // body: JSON.stringify(data)
    })
      .then((response) => response)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error.message;
      });

    if (result.ok) {
      const response = await result.json();
      return response;
    } else {
      return result;
    }
  }

  async post(url: string, data: any, token: string | undefined) {
    const result = await fetch(`${this.url}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error.message;
      });

    if (result.ok) {
      const response = await result;
      return response;
    } else {
      return result;
    }
  }

  async update(url: string, data: any, token: string | undefined) {
    const result = await fetch(`${this.url}${url}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error.message;
      });

    if (result.ok) {
      const response = await result;
      return response;
    } else {
      return result;
    }
  }

  async delete(url: string, token: string | undefined) {
    const result = await fetch(`${this.url}${url}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error.message;
      });

    if (result.ok) {
      const response = await result;
      return response;
    } else {
      return result;
    }
  }

  async getAll(url: string) {
    const result = await fetch(`${this.url}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error.message;
      });

    if (result.ok) {
      const response = await result.json();
      return response;
    } else {
      return result;
    }
  }

  async postAll(url: string, data: any) {
    const result = await fetch(`${this.url}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error.message;
      });

    if (result.ok) {
      const response = await result;
      return response;
    } else {
      return result;
    }
  }
}
