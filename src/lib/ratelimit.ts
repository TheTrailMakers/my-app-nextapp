import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Lazy-load Redis client to prevent build-time initialization errors
let redisInstance: Redis | null = null;
let authRatelimitInstance: Ratelimit | null = null;

function getRedisClient(): Redis {
  if (!redisInstance) {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      // Return a mock that allows the build to proceed
      throw new Error('Upstash Redis credentials are not configured');
    }
    redisInstance = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
  return redisInstance;
}

// 5 requests per 10 minutes per IP
export function getAuthRatelimit(): Ratelimit {
  if (!authRatelimitInstance) {
    authRatelimitInstance = new Ratelimit({
      redis: getRedisClient(),
      limiter: Ratelimit.slidingWindow(5, '10 m'),
      analytics: true,
      prefix: 'trail-makers-auth',
    });
  }
  return authRatelimitInstance;
}

// Export for backward compatibility
export const authRatelimit = {
  limit: async (_identifier: string) => {
    const ratelimit = getAuthRatelimit();
    return ratelimit.limit(_identifier);
  }
};
