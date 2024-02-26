import { useCallback } from 'react';
import axios from 'axios';
import Config from 'react-native-config';

type ApiServiceParams = {
  isDataSession: boolean;
  currency: string;
  market: string;
  bankId?: string;
  referenceIdString: string;
  environment: string;
};

type ApiResponse = {
  id?: string;
  error?: any;
};

const useApiService = () => {
  const postRequest = useCallback(
    async ({
      isDataSession,
      currency,
      market,
      bankId,
      referenceIdString,
      environment,
    }: ApiServiceParams): Promise<ApiResponse> => {
      const DataSessionRequest = {
        prefill: {
          ...(bankId ? { bankId: bankId } : undefined),
        },
        market: market,
        locale: 'en',
        permissions: ['identity'],
        referenceId: referenceIdString,
        successCallbackUrl: 'https://example.com/success',
        errorCallbackUrl: 'https://example.com/error',
        resultCallbackUrl: 'https://example.com/result',
      };

      const CheckoutDataSessionRequest = {
        prefill: {
          ...(bankId ? { bankId: bankId } : undefined),
        },
        market: market,
        locale: 'en',
        price: {
          total: 1,
          currency: currency,
        },

        referenceId: referenceIdString,
      };

      try {
        const apiUrl = getApiUrlFor(environment, isDataSession);
        const apiKey = getApiKeyFor(environment);
        const response = await axios.post(
          apiUrl,
          isDataSession ? DataSessionRequest : CheckoutDataSessionRequest,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Ivy-Api-Key': apiKey,
            },
          }
        );

        const idString: string = response.data.id;
        if (!idString) {
          throw new Error('ID string not found in response.');
        }

        return { id: idString };
      } catch (error) {
        console.log('response', JSON.stringify(error));
        return { error };
      }
    },
    []
  );

  return { postRequest };
};

const getApiUrlFor = (environment: string, isDataSession: boolean): string => {
  switch (environment) {
    case 'Sandbox':
      return isDataSession ? Config.SAND_API_URL : Config.SAND_CHECKOUT_API_URL;
    case 'Production':
      return isDataSession ? Config.PROD_API_URL : Config.PROD_CHECKOUT_API_URL;
    default:
      throw new Error('Invalid environment. API URL cannot be determined.');
  }
};

const getApiKeyFor = (environment: string): string => {
  switch (environment) {
    case 'Sandbox':
      return Config.SAND_API_KEY;
    case 'Production':
      return Config.PROD_API_KEY;
    default:
      throw new Error('Invalid environment. API key cannot be determined.');
  }
};

export default useApiService;
