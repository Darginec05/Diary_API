import * as dotenv from "dotenv";

export class ConfigService {
  private readonly envPath: string;

  constructor(path: string) {
    dotenv.config({ path })
    this.envPath = path;
  }

  get(key: string): string {
    // if(!process.env[key]) {
    //   throw new Error(`MISSED key: ${key} in ${this.envPath}`)
    // }
    return process.env[key] || '';
  }
}