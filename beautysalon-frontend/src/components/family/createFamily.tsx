/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useEffect, useState } from 'react';

import Text from '../common/text/text';
import SearchBar from '../common/searchBar';
import Table from '../common/table';
import { ERROR } from '../../constants/color';
import Modal, { modalState } from '../common/modal/modal';
import { ColumnsType } from 'antd/es/table';

interface CreateFamilyProps {
  tabIdx: number;
}

interface FamilyTableType {
  key: React.Key;
  name: string;
  sex: string;
  phone: string;
  address: string;
  delete: string;
}

interface UserTableType {
  key: React.Key;
  name: string;
  sex: string;
  phone: string;
  address: string;
}

function createFamily(props: CreateFamilyProps) {
  const { tabIdx } = props;
  const [search, setSearch] = useState<string>('');
  const [searchUser, setSearchUser] = useState<string>('');

  const [modalOpen, setModalOpen] = useState<boolean>(false); // 패밀리 생성, 수정 확인 모달
  const [modalState, setModalState] = useState<modalState>({
    title: '해당 구성원으로 패밀리 생성을 완료할까요?',
    body: '',
  });

  // const [familyRow] = useState(
  //   Array.from({ length: 3 }, (_, n) => ({
  //     이름: `홍길동${n}`,
  //     성별: '남자',
  //     번호: `010-1111-111${n}`,
  //     주소: '서울시 서울 종로구 세종대로 175',
  //     삭제: '삭제하기',
  //   })),
  // );
  // const [familyCol] = useState([
  //   { field: '이름', flex: 1 },
  //   { field: '성별', flex: 1 },
  //   { field: '번호', flex: 1 },
  //   { field: '주소', flex: 2 },
  //   { field: '삭제', flex: 1 },
  // ]);

  const [familyRow] = useState<FamilyTableType[]>(
    Array.from({ length: 8 }, (_, n) => ({
      key: n.toString(),
      name: `홍길동${n}`,
      sex: '남자',
      phone: `010-1111-111${n}`,
      address: '서울시 서울 종로구 효자로 12',
      delete: '삭제하기',
    })),
  );
  const [familyCol] = useState<ColumnsType<FamilyTableType>>([
    { title: '이름', dataIndex: 'name' },
    { title: '성별', dataIndex: 'sex' },
    { title: '번호', dataIndex: 'phone' },
    { title: '주소', dataIndex: 'address' },
    { title: '삭제', dataIndex: 'delete' },
  ]);

  // const [userRow] = useState(
  //   Array.from({ length: 8 }, (_, n) => ({
  //     이름: `홍길동${n}`,
  //     성별: '남자',
  //     번호: `010-1111-111${n}`,
  //     주소: '서울시 서울 종로구 효자로 12',
  //   })),
  // );
  // const [userCol] = useState([
  //   {
  //     field: '이름',
  //     flex: 1,
  //     headerCheckboxSelection: true,
  //     checkboxSelection: true,
  //     showDisabledCheckboxes: true,
  //   },
  //   { field: '성별', flex: 1 },
  //   { field: '번호', flex: 1 },
  //   { field: '주소', flex: 2 },
  // ]);

  const [userRow] = useState<UserTableType[]>(
    Array.from({ length: 8 }, (_, n) => ({
      key: n.toString(),
      name: `홍길동${n}`,
      sex: '남자',
      phone: `010-1111-111${n}`,
      address: '서울시 서울 종로구 효자로 12',
    })),
  );
  const [userCol] = useState<ColumnsType<UserTableType>>([
    { title: '이름', dataIndex: 'name' },
    { title: '성별', dataIndex: 'sex' },
    { title: '번호', dataIndex: 'phone' },
    { title: '주소', dataIndex: 'address' },
  ]);

  useEffect(() => {
    setModalState({ title: `해당 구성원으로 패밀리 ${tabIdx === 0 ? '생성' : '수정'}을 완료할까요?`, body: '' });
  }, [tabIdx]);

  return (
    <div css={conatinerStyle}>
      <div>
        <Text type="tableContent" value={'패밀리 명'} style={{ color: '#FF9164' }} />
        <div css={searchContainerStyle}>
          <SearchBar value={search} placeholder={'사용하실 패밀리 명을 입력해주세요.'} setValue={setSearch} />
          <span css={errMsgStyle}>중복된 패밀리명 입니다.</span>
        </div>
      </div>

      <div>
        <Text type="tableContent" value={'홍길동 패밀리'} />
        <div css={tableStyle}>
          <Table row={familyRow} col={familyCol} fontSize="11"></Table>
        </div>
      </div>

      <div>
        <Text type="tableContent" value={'구성원 선택'} />
        <div css={searchContainerStyle}>
          <SearchBar value={searchUser} placeholder={'추가하고 싶은 회원명을 입력해주세요.'} setValue={setSearchUser} />
          <button css={btnStyle} onClick={() => setModalOpen(!modalOpen)}>
            패밀리 생성
          </button>
          <span css={errMsgStyle}>구성원은 최대 10명까지 선택 가능합니다.</span>
        </div>

        <div css={[tableStyle, fullTableStye]}>
          <Table row={userRow} col={userCol} fontSize="11"></Table>
        </div>
      </div>

      {modalOpen ? (
        <Modal title={modalState.title} body={modalState.body} chngShowing={() => setModalOpen(!modalOpen)} />
      ) : null}
    </div>
  );
}

const conatinerStyle = css`
  width: fit-content;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const searchContainerStyle = css`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const errMsgStyle = css`
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;

  color: ${ERROR};
`;

const btnStyle = css`
  width: 111px;
  height: 33px;

  color: white;
  background: rgba(179, 136, 255, 0.6);
  border: none;
  border-radius: 50px;

  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  vertical-align: middle;
`;

const tableStyle = css`
  width: 40%;
  margin-top: 10px;
  min-width: 710px;
`;

const fullTableStye = css`
  width: 100%;
  min-width: 1000px;
`;

export default createFamily;
