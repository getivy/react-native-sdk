declare module 'react-native-config' {
  export interface Env {
    SAND_API_KEY: string;
    PROD_API_KEY: string;
    SAND_API_URL: string;
    PROD_API_URL: string;
    SAND_CHECKOUT_API_URL: string;
    PROD_CHECKOUT_API_URL: string;
  }

  const Config: Env;
  export default Config;
}
