/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useCallback, useRef, useState } from 'react';
import { Table as AntdTable, Divider } from 'antd';
// import { AgGridReact } from 'ag-grid-react';
// import { ColDef, RowNode } from 'ag-grid-community';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ORANGE1, MAUVE1, MAUVE2, ORANGE2, GRAY1, GRAY2 } from '../../constants/color';
// import SearchBar from '../../components/common/searchBar';

interface Props {
  row: object[];
  col: object[];
  fontSize?: string;
}

function Table({ row, col, fontSize = '9' }: Props) {
  console.log(row, col, fontSize);

  return (
    <AntdTable
      columns={col}
      dataSource={row}
      pagination={{ pageSize: 20 }}
      size="middle"
      css={css`
        .ant-table-thead > tr > th {
          color: white;
          background-color: ${ORANGE1};
        }
      `}
    />
  );
}

export default Table;

// function Table({ row, col, fontSize = '9' }: Props) {
//   const onGridReady = function (event: any) {
//     console.log(event.api);
//     event.api.sizeColumnsToFit();
//   };
//   const getRowHeight = function (param: any) {
//     if (param.node.rowPinned) {
//       return 30;
//     }
//     return 24;
//   };
//   const defaultColdef = {
//     editable: false,
//     sortable: true,
//     minWidth: 100,
//     filter: true,
//     flex: 1,
//     floatingFilter: true,
//     //   checkboxSelection: true,

//     // 행 사이즈 자동 조절
//     autoHeight: true,
//     cellStyle: { 'white-space': 'normal' },
//   };
//   const [defaultcol, setDefaultcol] = useState(defaultColdef);
//   const onRowClicked = function (event: any) {
//     // console.log(event);

//     console.log(event.api.gridOptionsService.gridOptions.defaultColDef.autoHeight);
//     console.log(event.rowIndex);
//     // onGridReady(event);
//   };

//   return (
//     <div
//       css={css`
//         font-size: 14px;
//         height: 565px;
//       `}
//       className="ag-theme-alpine"
//     >
//       <AgGridReact
//         css={css`
//           --ag-font-size: ${fontSize}px;
//           --ag-borders: 10px;

//           /* --ag-background-color: rgb(249, 245, 227); */
//           --ag-header-foreground-color: white;
//           --ag-header-background-color: ${ORANGE1};
//           --ag-odd-row-background-color: rgb(0, 0, 0, 0.05);
//           .ag-header-row-column-filter {
//             color: rgb(0, 0, 0, 0.5);
//             background-color: ${ORANGE2};
//           }
//           .ag-paging-panel {
//             color: rgb(0, 0, 0, 0.5);
//             background-color: ${ORANGE2};
//           }
//         `}
//         rowData={row}
//         columnDefs={col}
//         defaultColDef={defaultcol}
//         pagination={true}
//         // paginationAutoPageSize={true}
//         paginationPageSize={10}
//         rowSelection={'multiple'}
//         // onGridReady={onGridReady}
//         // getRowHeight={getRowHeight}
//         onRowClicked={onRowClicked} // row클릭시 데이터 출력
//         suppressHorizontalScroll={true} // 가로 스크롤 허용
//         detailCellRenderer={SearchBar}
//       ></AgGridReact>
//     </div>
//   );
// }

// export default Table;
