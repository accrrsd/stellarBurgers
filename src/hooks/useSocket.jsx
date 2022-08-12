import { useCallback, useEffect, useRef } from 'react'
import propValidate from 'prop-types'

export const useSocket = (url, options) => {
  const ws = useRef(null)
  const connect = useCallback(
    (token) => {
      ws.current = new WebSocket(token ? `${url}?token=${token}` : `${url}`)
      ws.current.onopen = (e) => typeof options.onConnect === 'function' && options.onConnect(e)
      ws.current.onmessage = (e) => typeof options.onMessage === 'function' && options.onMessage(e)
      ws.current.onerror = (e) => typeof options.onError === 'function' && options.onError(e)
      ws.current.onclose = (e) => typeof options.onClose === 'function' && options.onClose(e)
    },
    [url, options]
  )

  useEffect(() => {
    if (ws.current) {
      if (typeof options.onMessage === 'function') {
        ws.current.onmessage = options.onMessage
      }
      if (typeof options.onConnect === 'function') {
        ws.current.onopen = options.onConnect
      }
      if (typeof options.onError === 'function') {
        ws.current.onerror = options.onError
      }
      if (typeof options.onClose === 'function') {
        ws.current.onclose = options.onClose
      }
    }
  }, [options, ws])

  useEffect(() => {
    return () => {
      if (ws.current && typeof ws.current.close === 'function') {
        ws.current.close()
      }
    }
  }, [])

  const sendData = useCallback(
    (message) => {
      ws.current.send(JSON.stringify(message))
    },
    [ws]
  )

  return { connect, sendData }
}

useSocket.propTypes = {
  url: propValidate.oneOfType([propValidate.string, propValidate.bool]).isRequired,
  options: propValidate.shape({
    onOpen: propValidate.func,
    onMessage: propValidate.func,
    onClose: propValidate.func,
    onError: propValidate.func,
  }),
}
