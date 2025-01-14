/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useEffect, useState } from 'react';
// import InputContainer, { inputContainerStyle, smallInputContainerStyle } from '../inputContainer/inputContainer';
import { shopInfoConfig } from '../../config/shopAccountConfig';
import Input from '../common/input/input';
import ModalInput from '../common/modal/modalInput';
import Select from '../common/select/select';
import Modal, { modalState } from '../common/modal/modal';
import Text from '../common/text/text';
import TimeSelect from '../common/select/TimeSelect';
import { paymentModalConfig, reservationConfigData } from '../../config/paymentConfig';
import { ORANGE2, ORANGE1, MAUVE1 } from '../../constants/color';
import { FaPlusCircle } from 'react-icons/fa';
import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';

interface ReservationProps {
  customer: string;
  manager: string;
  timePlacehoder: string[];
  request: string;
  style: string[];
  money: string;
}
interface Props {
  isReservation?: boolean;
  reservationData?: ReservationProps;
  isModify?: boolean;
}

function PaymentModal({ isReservation = true, reservationData = reservationConfigData, isModify = true }: Props) {
  const [open, setOpen] = useState<boolean>(true); // 샵 정보 수정 모달
  const [modalOpen, setModalOpen] = useState<boolean>(false); // 샵 정보 수정 완료 확인 모달
  const [modalState, setModalState] = useState<modalState>({ title: '', body: '' });
  const [disable, setDisable] = useState<boolean>(false); // '결제 수정' 모달일 경우 disabled 처리용

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onClickNext = () => {
    setModalOpen(!modalOpen);
    setModalState({ title: '결제가 완료되었습니다!', body: '' });
  };

  useEffect(() => {
    if (isModify) setDisable(true);
  }, []);

  return open ? (
    <div>
      <ModalInput
        title={undefined}
        nextBtnText={'결제'}
        chngShowing={() => setOpen(!open)}
        nextBtn={() => onClickNext()}
      >
        <div css={inputContainerStyle}>
          {/* <h3
            css={css`
              text-align: center;
            `}
          >
            결제하기
          </h3> */}
          <div css={dateLayout}>
            <Text value={'결제 날짜'} type="label" />
            {disable ? <DatePicker onChange={onChange} disabled /> : <DatePicker onChange={onChange} />}
          </div>
          {paymentModalConfig.map((item, idx) => {
            if (item.type === 'timeSelect') {
              const placeholderValue = isReservation ? reservationData.timePlacehoder : item.placeholderList;
              if (isReservation)
                return <TimeSelect key={idx} title={item.title!} placeholder={placeholderValue!} disable={disable} />;
            } else if (item.type === 'select') {
              let selectPlaceholder = item.placeholder;
              if (isReservation) {
                if (item.title === '담당자') selectPlaceholder = reservationData.manager;
                if (item.title === '예약자') selectPlaceholder = reservationData.customer;
              }

              if (item.title === '담당자' || isReservation) {
                return (
                  <div css={selectLayout}>
                    <div>
                      <Text value={item.title!} type="label" />
                    </div>
                    <div>
                      <Select
                        key={idx}
                        placeholder={selectPlaceholder!}
                        options={item.optionList!}
                        disable={disable}
                      ></Select>
                    </div>
                  </div>
                );
              }
            } else if (item.type === 'style') {
              const placeholderValue1 = isReservation ? reservationData.style[0] : item.placeholder1;
              const placeholderValue2 = isReservation ? reservationData.style[1] : item.placeholder2;
              return (
                <div css={styleLayout}>
                  <div css={styleContentLayout}>
                    <div css={styleTextLayout}>
                      <Text value={item.title!} type="label" />
                    </div>
                    <div css={styleInputLayout}>
                      <Input key={idx} inputType={'big'} placeholder={placeholderValue1!} disable={disable} />
                      <Input key={idx} inputType={'big'} placeholder={placeholderValue2!} disable={disable} />
                    </div>
                  </div>
                  <div css={styleContentLayout}>
                    <div css={styleSelectLayout}>
                      {item.selectList!.map((selectItem, idx) => {
                        return (
                          <Select
                            key={idx}
                            placeholder={selectItem.placeholder!}
                            options={selectItem.optionList!}
                            disable={disable}
                          ></Select>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            } else if (item.type === 'point') {
              return (
                <div css={pointLayout}>
                  <div css={pointContentLayout}>
                    <div css={pointTextLayout}>
                      <Text value={item.title!} type="label" />
                    </div>
                    <div css={pointInputLayout}>
                      <div>
                        <div css={pointSpan}>
                          <span css={orangeSpan}>패밀리 </span>
                          <span>잔여</span>
                        </div>
                        <Input key={idx} inputType={'big'} placeholder={item.placeholder1!} />
                      </div>
                      <div>
                        <div css={pointSpan}>
                          <span css={orangeSpan}>패밀리 </span>
                          <span>사용</span>
                        </div>
                        <Input key={idx} inputType={'big'} placeholder={item.placeholder2!} />
                      </div>
                    </div>
                  </div>
                  <div css={pointContentLayout}>
                    <div css={pointTextLayout}>
                      <Text value={''} type="label" />
                    </div>
                    <div css={pointInputLayout}>
                      <div>
                        <div css={pointSpan}>
                          <span css={orangeSpan}>개인 </span>
                          <span>잔여</span>
                        </div>
                        <Input key={idx} inputType={'big'} placeholder={item.placeholder3!} />
                      </div>
                      <div>
                        <div css={pointSpan}>
                          <span css={orangeSpan}>개인 </span>
                          <span>사용</span>
                        </div>
                        <Input key={idx} inputType={'big'} placeholder={item.placeholder4!} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else if (item.type === 'textarea') {
              const placeholderValue = isReservation ? reservationData.request : item.placeholder;
              return (
                <div css={textareaItemStyle} key={idx}>
                  <Text value={item.title!} type="label" />
                  <textarea css={textareaStyle} placeholder={placeholderValue!} disabled={disable}></textarea>
                </div>
              );
            } else if (item.type === 'method') {
              return (
                <div css={styleContentLayout}>
                  <div css={methodTextLayout}>
                    <Text value={item.title!} type="label" />
                  </div>
                  <div css={methodInputLayout}>
                    <Select key={idx} placeholder={item.selectPlaceholder!} options={item.optionList!}></Select>
                    <Input key={idx} inputType={'big'} placeholder={item.placeholder!} />
                  </div>
                </div>
              );
            } else if (item.type === 'plus') {
              return (
                <div css={plusIconLayout}>
                  <FaPlusCircle size="24" />
                </div>
              );
            } else {
              return <Input key={idx} inputType={'big'} title={item.title} placeholder={item.placeholder!} />;
            }
          })}
        </div>
      </ModalInput>

      {modalOpen ? (
        <Modal title={modalState.title} body={modalState.body} chngShowing={() => setModalOpen(!modalOpen)} />
      ) : null}
    </div>
  ) : null;
}

const dateLayout = css`
  display: flex;
  align-items: center;
  gap: 70px;
`;
const methodTextLayout = css`
  width: 137px;
`;
const methodInputLayout = css`
  display: flex;
  justify-content: space-between;
  gap: 60px;
`;
const plusIconLayout = css`
  text-align: right;
  margin-right: 10px;
`;
const orangeSpan = css`
  color: ${MAUVE1};
`;
const pointLayout = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const pointSpan = css`
  width: 200px;
  font-size: 11px;
  margin-bottom: 5px;
`;
const pointInputLayout = css`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;
const pointTextLayout = css`
  width: 160px;
`;
const pointContentLayout = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const selectLayout = css`
  display: flex;
  gap: 90px;
  align-items: center;
`;

const styleLayout = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const styleContentLayout = css`
  display: flex;
  align-items: center;
`;
const styleTextLayout = css`
  width: 160px;
`;
const styleSelectLayout = css`
  display: flex;
  gap: 20px;
  margin-left: 140px;
`;
const styleInputLayout = css`
  display: flex;
  justify-content: space-between;
  gap: 30px;
`;
const inputContainerStyle = css`
  width: 547px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 15px;
`;

const textareaItemStyle = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const textareaStyle = css`
  width: 100%;
  max-width: 410px;
  height: 75px;
  padding: 8px 20px;

  color: #666666;
  background-color: white;
  border: none;
  border-radius: 10px;
  outline: none;
  resize: none;
`;

export default PaymentModal;
