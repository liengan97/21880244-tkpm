'use client'

import { MD5 as md5 } from 'object-hash';

export type TableHeaderProps = {
  name: string,
  columnIndex?: string,
  classNames?: string,
  width?: string
  render?: (val: any) => any
}

type LocalMap = {
  [x: string]: any
}

type Props = {
  rowData: Array<any>,
  headers: Array<TableHeaderProps>,
  allowActions?: boolean
  onView?: (values: any) => any
  onRemove?: (values: any) => any
  onRowClick?: (values: any) => any
}

export const TABLE_ROW_ACTIONS = "_table_row_actions";

export default function V2Table({ headers, rowData, allowActions, onView, onRowClick, onRemove }: Props) {
  let map: LocalMap = {};

  const getHeaders = () => {
    if (!headers) {
      return [];
    }

    const colHeaders = headers.map(({ name, classNames, width }) => {
      return (
        // <th key={md5(name)} scope="col" className={classNames ? classNames : "px-6 py-3 border"}>
        <th
          key={md5(name)}
          scope="col"
          style={{
            minWidth: width ? width : undefined
          }}
          className={`px-6 py-3 border ${classNames ? classNames : ''}`}
        >
          {name}
        </th>
      )
    });

    return (
      <thead className="text-xs text-gray-700 uppercase bg-[#ededed] h-14 border">
        <tr>
          {colHeaders}
        </tr>
      </thead>
    )
  }

  const getBodyItems = () => {
    if (!rowData) {
      return [];
    }

    const rows = rowData.map((item) => {
      const rowId = md5(item);

      map = {
        ...map,
        [rowId]: item
      }

      const cols = headers.map(({ render, columnIndex }) => {
        if (columnIndex !== TABLE_ROW_ACTIONS) {
          if (render) {
            return (
              <td key={Math.random()} className="px-6 py-4 border">
                {render(item[columnIndex])}
              </td>
            )
          }

          return (
            <td key={Math.random()} className="px-6 py-4 border">
              {item[columnIndex]?.toString()}
            </td>
          )
        }
        return null;
      })

      return (
        <tr key={rowId} id={rowId} className="bg-white border-b hover:bg-gray-50">
          {cols}
          {allowActions && (
            <td className="flex items-center px-6 py-4 space-x-3">
              {onView && (
                <button onClick={onView?.bind(null, map[rowId])}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </button>
              )}
              {onRowClick && (
                <button onClick={onRowClick?.bind(null, map[rowId])}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </button>
              )}
              {onRemove && (
                <button onClick={onRemove?.bind(null, map[rowId])}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              )}
            </td>
          )}
        </tr>
      )
    })
    return rows;
  }

  return (
    // <div className="relative overflow-x-auto sm:rounded-lg">
    <div className="relative overflow-x-auto no-scrollbar">
      <table className="w-full text-sm text-left text-gray-500 border">
        {getHeaders()}
        <tbody>
          {getBodyItems()}
        </tbody>
      </table>
    </div>
  )

};
