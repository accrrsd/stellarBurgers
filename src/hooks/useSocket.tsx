import { useCallback, useRef } from 'react'

type TSocketOptions = {
  onConnect?: (e: Event) => void
  onError?: (e: Event) => void
  onMessage?: (e: MessageEvent) => void
  onClose?: (e: CloseEvent) => void
}

export const useSocket = (url: string, options: TSocketOptions) => {
  const ws = useRef<WebSocket | null>(null)

  const connect = useCallback(
    (token?: string) => {
      ws.current = new WebSocket(token ? `${url}?token=${token}` : `${url}`)
      ws.current.onopen = (e) => typeof options.onConnect === 'function' && options.onConnect(e)
      ws.current.onmessage = (e) => typeof options.onMessage === 'function' && options.onMessage(e)
      ws.current.onerror = (e) => typeof options.onError === 'function' && options.onError(e)
      ws.current.onclose = (e) => typeof options.onClose === 'function' && options.onClose(e)
    },
    [url, options]
  )

  const sendData = useCallback(
    (message: any) => {
      ws.current?.send(JSON.stringify(message))
    },
    [ws]
  )

  const close = useCallback(() => {
    ws.current && ws.current.close()
  }, [ws])

  return { connect, sendData, close }
}
