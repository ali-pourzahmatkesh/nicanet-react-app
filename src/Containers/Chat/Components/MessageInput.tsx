import React, { useState } from 'react'
import styled from 'styled-components';

const Input = styled.textarea`
  border-radius: 12px;
  border: solid 1px #757575;
  display: flex;
  flex: 1;
  width: 100%;
  padding: 0.5rem;
  outline: 0;
  font-size: 1rem;
  resize: none;
`

const Container = styled.div`
  padding: 1rem;
  background-color: #eeeeee;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const SendButton = styled.div`
  background-color: #263551;
  color: #fff;
  padding: 0.6rem;
  text-align: center;
  border-radius: 10px;
  width: 100px;
  margin-top: 0.5rem;
`

interface MessageInputProps {
  onSend: (text: string, callback: (success: boolean) => void) => void
}

function MessageInput(props: MessageInputProps) {
  const [messaage, setMessaage] = useState('')
  const [isloading, setIsloading] = useState<boolean>(false)
  const { onSend } = props

  const sendCallBack = (success: boolean) => {
    setIsloading(false)
    if (success) setMessaage('')
  }

  const send = () => {
    setIsloading(true)
    onSend(messaage, sendCallBack)
  }

  return (
    <Container>
      <Input value={messaage} placeholder="Type your message..." onChange={e => setMessaage(e.target.value)} />
      <SendButton onClick={send}>{isloading ? '...' : 'Send'}</SendButton>
    </Container>
  )
}

export default MessageInput
