import { useRemoteState } from 'src/state'

function CallUser({ userId }: { userId: string }) {
  const socket = useRemoteState(state => state.socket)

  const callUser = (to: string) => {
    socket.emit('request:call-user', { from: userId, to })
  }

  return <button onClick={() => callUser('userB')}>Gọi B</button>
}

export default CallUser
