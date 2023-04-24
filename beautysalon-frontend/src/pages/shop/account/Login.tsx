/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';

import { shopLoginConfig } from '../../../config/shopAccountConfig';
import Input from '../../../components/common/input/input';
import InputContainer, {
  inputContainerStyle,
  smallInputContainerStyle,
} from '../../../components/inputContainer/inputContainer';
import Modal from '../../../components/common/modal/modal';

function Login() {
  interface modalState {
    title: string;
    body: string;
  }
  const [modalState, setModalState] = useState<modalState>({ title: '', body: '' });
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const onClickModal = (btn: string) => {
    setModalOpen(!modalOpen);

    if (btn === 'login') {
      setModalState({ title: '로그인에 성공하였습니다', body: '' });
    }
  };

  return (
    <div>
      <InputContainer title="로그인">
        <div css={[inputContainerStyle, smallInputContainerStyle]}>
          {shopLoginConfig.map((item, idx) => (
            <Input key={idx} inputType={'small'} title={item.title} placeholder={item.placeholder!} />
          ))}

          <div>
            <button css={[btnStyle, loginBtnStyle]} onClick={() => onClickModal('login')}>
              로그인
            </button>

            <div css={btnContainerStyle}>
              <button css={btnStyle}>회원가입</button>
              <button css={[btnStyle, findBtnStyle]}>아이디</button>
              <button css={[btnStyle, findBtnStyle]}>비밀번호 찾기</button>
            </div>
          </div>
        </div>
      </InputContainer>

      {modalOpen ? (
        <Modal title={modalState.title} body={modalState.body} chngShowing={() => setModalOpen(!modalOpen)} />
      ) : null}
    </div>
  );
}

const btnContainerStyle = css`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const btnStyle = css`
  width: 175px;
  height: 33px;

  background: white;
  border: none;
  border-radius: 10px;

  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`;

const loginBtnStyle = css`
  width: 100%;
  background: #f2f7dd;
`;

const findBtnStyle = css`
  width: auto;
  max-width: 110px;
  padding: 0;
  background-color: transparent;
`;

export default Login;
