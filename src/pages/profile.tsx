import React, { useEffect, useState } from 'react';
import { H2 } from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import { AddTeamBtn } from '@/components/pages/Profile/Styled.Profile';
import { auth } from '@/firebase-config';
import { useRouter } from 'next/router';

function Profile() {
  const router = useRouter();
  const [toggleModal, setToggleModal] = useState<boolean>(false);

  useEffect(() => {
    if (!auth.currentUser) {
      router.push(`/`);
    }
  });

  return (
    <MainBig>
      <H2>Create teams</H2>
      {toggleModal && (
        <section>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </section>
      )}
      <AddTeamBtn onClick={() => setToggleModal(true)}>
        New team <br /> +
      </AddTeamBtn>
    </MainBig>
  );
}

export default Profile;
