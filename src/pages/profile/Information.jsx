import React from 'react'
import styled from 'styled-components'

const Container = styled.section`
`

const Avatar = styled.div`
`

const Infos = styled.div`
`

const InfoItem = styled.div`
`

const schemaCanShow = [{
  column: 'email',
  name: 'Email'
}, {
  column: 'name',
  name: 'Name'
}, {
  column: 'bio',
  name: 'Bio'
}]

const Information = ({ user }) => {
  console.log(user)
  return (
    <Container>
      <Avatar>
        <img src={user.get('avatar')} />
      </Avatar>
      <Infos>
        {schemaCanShow.map((x, i) => (
          <InfoItem key={i}>
            <span>{x.name}</span>
            <span>{user.get(x.column)}</span>
          </InfoItem>
        ))}
      </Infos>
    </Container>
  )
}

export default Information
