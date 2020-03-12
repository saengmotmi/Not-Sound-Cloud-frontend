import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { GoogleLogin } from 'react-google-login';

const ClientID = {
  client_id: '774415266464-sglb6tricktd8bcc556bn9ucc2offgr1.apps.googleusercontent.com.apps.googleusercontent.com',
};

const SignModal = () => {
  const [modalVisible, setModalVisible] = useState(true);

  // // 구글 API

  // const init = () => {
  //   gapi.load('auth2', () => {
  //     const gauth = gapi.auth2.init(ClientID);
  //     gauth.then(() => {
  //       console.log('init success');
  //     }, () => {
  //       console.error('init fail');
  //     });
  //   });
  // };

  // const onSignIn = (googleUser) => {
  //   const profile = googleUser.getBasicProfile();
  //   console.log(`ID: ${profile.getId()}`); // Do not send to your backend! Use an ID token instead.
  //   console.log(`Name: ${profile.getName()}`);
  //   console.log(`Image URL: ${profile.getImageUrl()}`);
  //   console.log(`Email: ${profile.getEmail()}`); // This is null if the 'email' scope is not present.
  // };

  const turnModalOff = () => {
    setModalVisible(!modalVisible);
    console.log(modalVisible);
  };

  return (
    <>
      <ModalBg isVisible={modalVisible}>
        <Modal>
          <p>모달 창</p>
          <p>모달창 열렸다</p>
          <div onClick={onSignIn} className="g-signin2" data-onsuccess="onSignIn" />
          <button type="button" onClick={turnModalOff}>
            모달 창 닫자
          </button>
        </Modal>
      </ModalBg>
    </>
  );
};

const Modal = styled.div`
  width: 300px;
  height: 300px;
  background-color: white;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ModalBg = styled.div`
  position: absolute;
  top: 0;

  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.3);

  ${(props) => (props.isVisible ? css` display: flex; ` : css` display: none;`)}
`;

export default SignModal;
