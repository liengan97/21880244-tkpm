'use client'

import React, { useEffect, useMemo } from "react"

interface T extends Object { }

export type TableHeaderProps = {
  title: string,
  width?: string
  classNames?: string,
  render?: (val?: T) => any,
  columnKey: string | null,
}

type TableProps<T> = {
  dataRows: T[],
  headers: TableHeaderProps[]
}

const getRandomKey = () => {
  return Math.random();
}

export default function V2Table({ headers, dataRows }: TableProps<T>) {

  const renderHeaders = () => {
    const colHeaders = headers.map(({ title, classNames, width }) => {
      return (
        <th
          key={getRandomKey()}
          scope="col"
          style={{
            minWidth: width ? width : undefined
          }}
          className={`px-6 py-3 border ${classNames ? classNames : ''}`}
        >
          {title}
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

  const renderRows = () => {
    const rows = dataRows.map((dataRow: T) => {
      const cols = headers.map(({ render, columnKey }) => {
        let tdContent = null;
        if (render) {
          tdContent = render(dataRow);
        } else {
          tdContent = columnKey ? dataRow[columnKey as keyof T]?.toString() : null;
        }

        return (
          <td key={getRandomKey()} className="px-6 py-4 border">
            {tdContent}
          </td>
        )
      })

      return (
        <tr key={getRandomKey()} className="bg-white border-b hover:bg-gray-50">
          {cols}
        </tr>
      )
    })

    return rows;
  }

  const NoData = () => {
    return (
      <tr>
        <td colSpan={headers?.length}>No data!</td>
      </tr>
    )
  }

  return (
    <div className="relative overflow-x-auto no-scrollbar">
      <table className="w-full text-sm text-left text-gray-500 border">
        {renderHeaders()}
        <tbody>
          {(headers && dataRows) ? renderRows() : <NoData />}
        </tbody>
      </table>
    </div>
  )
};
