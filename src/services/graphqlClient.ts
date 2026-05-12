interface GraphQLResponse<T> {
  data?: T
  errors?: { message: string }[]
}

type GraphQLOperation = (variables?: Record<string, unknown>) => unknown

const mockHandlers: Record<string, GraphQLOperation> = {}

export function registerMockHandler(operationName: string, handler: GraphQLOperation) {
  mockHandlers[operationName] = handler
}

export async function executeGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const endpoint = import.meta.env.VITE_GRAPHQL_URL

  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      })

      if (!response.ok) {
        throw new Error(`GraphQL request failed: ${response.statusText}`)
      }

      const body = (await response.json()) as GraphQLResponse<T>

      if (body.errors?.length) {
        throw new Error(body.errors[0]?.message ?? 'Unknown GraphQL error')
      }

      if (!body.data) {
        throw new Error('GraphQL response missing data')
      }

      return body.data
    } catch (error) {
      console.warn('GraphQL request failed, falling back to mock handlers.', error)
    }
  }

  return executeMock<T>(query, variables)
}

function executeMock<T>(
  query: string,
  variables?: Record<string, unknown>,
): T {
  const operationName = extractOperationName(query)
  if (!operationName) {
    throw new Error('No mock handler registered for operation: unknown')
  }

  const handler = mockHandlers[operationName]
  if (!handler) {
    throw new Error(`No mock handler registered for operation: ${operationName}`)
  }

  return handler(variables) as T
}

function extractOperationName(query: string): string | null {
  const operationPattern = /(query|mutation)\s+([A-Za-z0-9_]+)/i
  const match = operationPattern.exec(query)
  return match?.[2] ?? null
}
