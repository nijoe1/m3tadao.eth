import { useState } from 'react';
import {
  Avatar,
  Container,
  Title,
  Notification,
  Space 
} from '@mantine/core';
import { IconCheck } from '@tabler/icons';

import { Layout } from '../Layout';

// const useStyles = createStyles((theme) => ({
//   space:{ marginBottom:"20px"}
// }))

export function Notifications() {
  // const {classes}= useStyles()

  return (
    <>
    <Layout>
      <Container sx={(theme)=>({
        marginTop:"30px"
      })}>
        <Title order={3} style={{paddingBottom:"20px"}}>Notifications</Title>
        <Notification title="Somebody watched your project!">
        M3tadao now has 10000 views...
      </Notification>
      <Space h="md" />
      <Notification 
    
      icon={<Avatar
      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60"
      alt="Kira"
    />} title="Kira M3tadao likes your post">
        This is a post about cat and cakes, this is a post about cat and cakes...
      </Notification>
      <Space h="md" />
      <Notification title="Somebody watched your project!">
        M3tadao now has 10000 views...
      </Notification>
      <Space h="md" />
      <Notification 
    
      icon={<Avatar
      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60"
      alt="Kira"
    />} title="Kira M3tadao likes your post">
        This is a post about cat and cakes, this is a post about cat and cakes...
      </Notification>
      
       
      </Container>
     
        </Layout>
 </>
    
  );
}