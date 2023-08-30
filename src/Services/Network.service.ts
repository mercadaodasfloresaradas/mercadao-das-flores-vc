import { ENetworkRequestMethod } from "../Enums/Network";

class Network {
  private getOptionts(
    method: ENetworkRequestMethod,
    body: { [id: string]: any } | [] | null
  ) {
    let result: RequestInit = {
      method,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };

    if (body) {
      result.body = JSON.stringify(body);
    }

    return result;
  }

  private async request(
    url: string,
    method: ENetworkRequestMethod,
    body: { [id: string]: any } | [] | null = null
  ): Promise<any> {
    const response = await fetch(url, {
      ...this.getOptionts(method, body),
    });

    return response.json();
  }

  async post(url: string, body: { [id: string]: any } | []): Promise<any> {
    return await this.request(url, ENetworkRequestMethod.post, body);
  }

  async get(url: string): Promise<any> {
    return await this.request(url, ENetworkRequestMethod.get);
  }
}

export const network = new Network();
