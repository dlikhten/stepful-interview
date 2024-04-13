export const BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL!;
if (!BASE_URL) {
  throw new Error('No BASE_URL is defined, cannot run');
}

export const IS_SERVER: boolean = typeof window === 'undefined';
