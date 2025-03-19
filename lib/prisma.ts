import { PrismaClient } from '@prisma/client'

// Create the PrismaClient instance
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['info', 'warn', 'error']
  })
}

// Use type for global declaration to avoid ESLint error
declare global {
  const prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

// Export the client as both default and named export
const prisma = globalThis.prisma ?? prismaClientSingleton()
export default prisma

// For backwards compatibility with your existing code
export const db = prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

// You can add helper functions here similar to the example
// export async function updateUserProfile(...) { ... }