import { useEffect, useState } from 'react'
import { useRemoteState } from '../state'

function IncomingCall() {
  const [caller, setCaller] = useState<string | null>(null)
  const [showCall, setShowCall] = useState(false)

  const socket = useRemoteState(state => state.socket)

  useEffect(() => {
    socket.on('action:incoming-call', ({ from }) => {
      setCaller(from)
      setShowCall(true)
    })

    socket.on('action:call-ended', ({ message }) => {
      alert(message)
      setShowCall(false)
      setCaller(null)
    })

    return () => {
      socket.off('action:incoming-call')
      socket.off('action:call-ended')
    }
  }, [])

  const acceptCall = () => {
    socket.emit('request:accept-call', { from: caller })
    setShowCall(false)
  }

  const rejectCall = () => {
    socket.emit('request:reject-call', { from: caller })
    setShowCall(false)
  }

  return (
    showCall && (
      <div>
        <p>Bạn nhận được cuộc gọi từ {caller}</p>
        <button onClick={acceptCall}>Chấp nhận</button>
        <button onClick={rejectCall}>Từ chối</button>
      </div>
    )
  )
}

export default IncomingCall
