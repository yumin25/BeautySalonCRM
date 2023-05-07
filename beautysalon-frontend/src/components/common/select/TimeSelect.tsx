/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import Select from './select';

interface TimeProps {
  title: string;
  placeholder: string[];
}

const TimeSelect = (props: TimeProps) => {
  const { title, placeholder } = props;

  const hourList = Array.from({ length: 24 }, (_, n) => String(n).padStart(2, '0'));
  const minuteList = Array.from({ length: 12 }, (_, n) => String(n * 5).padStart(2, '0'));

  return (
    <div css={continerStyle}>
      <p css={inputTitleStyle}>{title}</p>
      <div css={selectListStyle}>
        <div css={timeStyle}>
          <Select placeholder={placeholder[0]} options={hourList} value={undefined}></Select>
          <Select placeholder={placeholder[1]} options={minuteList} value={undefined}></Select>
        </div>
        <span>~</span>
        <div css={timeStyle}>
          <Select placeholder={placeholder[2]} options={hourList} value={undefined}></Select>
          <Select placeholder={placeholder[3]} options={minuteList} value={undefined}></Select>
        </div>
      </div>
    </div>
  );
};

const continerStyle = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const inputTitleStyle = css`
  height: 19px;
  margin: 0;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`;

const selectListStyle = css`
  width: 100%;
  max-width: 410px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const timeStyle = css`
  display: flex;
  gap: 20px;
`;

export default TimeSelect;
