import config from '@/payload.config'
import { getPayload } from 'payload'

let payloadPromise: ReturnType<typeof getPayload> | null = null

export const getPayloadClient = () => {
  if (!payloadPromise) {
    payloadPromise = getPayload({ config }).catch((error) => {
      payloadPromise = null
      throw error
    })
  }

  return payloadPromise
}
