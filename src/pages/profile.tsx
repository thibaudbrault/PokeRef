import React from 'react';
import { MainBig } from '../components/Common/Sizing';

function Profile() {
  return (
    <MainBig>
      <h2>Profile</h2>
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
