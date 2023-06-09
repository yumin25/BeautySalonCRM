/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';
import Header from '../layout/header';
import ArticleHeader from '../layout/articleHeader';
import TextRow from '../common/textRow';
import Button from '../common/button/button';
import Text from '../common/text/text';
import { MAUVE2 } from '../../constants/color';
import HistoryLayout from '../common/history/historyLayout';
import History from '../common/history/history';
import { reservationListConfig } from '../../config/reservationConfig';

function ScheduleList() {
  const [historyData, setHistoryData] = useState(reservationListConfig);
  return (
    <div>
      <span css={spanStyle}>{`Today 2018.02.03`}</span>
      <hr css={hrStyle} />
      {historyData ? (
        historyData.map((item, idx) => {
          return (
            <div>
              <HistoryLayout>
                <History
                  key={idx}
                  startTime={item.startTime}
                  endTime={item.endTime}
                  operationName={item.operationName}
                  name={item.name}
                  reservation_manager_list={true}
                />
              </HistoryLayout>
            </div>
          );
        })
      ) : (
        <div>
          <p>
            예약 건이 없습니다.<br></br>상단의 '에약 하기' 버튼을 통해 예약해주세요.
          </p>
        </div>
      )}
    </div>
  );
}

const spanStyle = css`
  font-weight: bold;
`;

const hrStyle = css`
  border: 0px;
  height: 2px;
  background-color: ${MAUVE2};
  margin-bottom: 20px;
`;

export default ScheduleList;