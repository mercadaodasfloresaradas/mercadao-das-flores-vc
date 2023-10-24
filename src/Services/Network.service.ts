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
    body: { [id: string]: any } | [] | null = null,
    isJson: boolean = true
  ): Promise<any> {
    const makeRequest = () =>
      fetch(url, {
        ...this.getOptionts(method, body),
      });

    const response = await makeRequest();

    if (isJson) {
      return response.json();
    } else {
      return response.text();
    }
  }

  async post(
    url: string,
    body: { [id: string]: any } | [],
    isJson: boolean = true
  ): Promise<any> {
    return await this.request(url, ENetworkRequestMethod.post, body, isJson);
  }

  async get(url: string, isJson: boolean = true): Promise<any> {
    return await this.request(url, ENetworkRequestMethod.get, null, isJson);
  }
}

export const network = new Network();
