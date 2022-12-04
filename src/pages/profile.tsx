import React from 'react';
import { getSession, useSession } from 'next-auth/react';
import { MainBig } from '../components/Common/Sizing';
import { ProfileTitle } from '@/components/Auth/StyledProfile';

function Profile() {

  const { data: session } = useSession();

  return (
    <MainBig>
      <ProfileTitle>{session?.user?.name}'s favorites Pokemon</ProfileTitle>
    </MainBig>
  );
}

export default Profile;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}