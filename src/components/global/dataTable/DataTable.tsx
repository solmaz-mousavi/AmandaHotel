import "./dataTable.scss";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
  TableNode,
  Data,
  Identifier,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import {
  useSort,
  HeaderCellSort,
  SortFn,
} from "@table-library/react-table-library/sort";
import { ReactNode, useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa6";
import { usePagination } from "@table-library/react-table-library/pagination";

export type TableRowsType = {
  name: string;
  title: string;
  sortType: "number" | "string" | "length" | null;
  content: (a: TableNode) => ReactNode;
};
export type TableExpandsType = {
  name: string;
  title: string;
  content: (a: TableNode) => ReactNode;
};
type DataTablePropsType = {
  data: Data<TableNode>;
  rows: TableRowsType[];
  expands: TableExpandsType[];
};

export default function DataTable({ data, rows, expands }: DataTablePropsType) {
  // ---- expand data
  const [ids, setIds] = useState<Identifier[]>([]);
  const handleExpand = (item: TableNode) => {
    console.log(item);
    console.log(ids);

    if (ids.includes(item.id)) {
      setIds(ids.filter((id) => id !== item.id));
    } else {
      setIds(ids.concat(item.id));
    }
  };

  // ----theme data
  const THEME = {
    Table: `
			padding: 20px 50px;
			`,
    Header: ``,
    Body: ``,
    BaseRow: ``,
    HeaderRow: `
   		font-size: 14px;
    	color: var(--gold-color);
    	.th {
				border-bottom: 1px solid var(--gold-color);
			}
			svg {
				fill: var(--aqua-color);
				margin: 0 5px;
			}
			`,
    Row: `
			font-size: 14px;
			color: #777;
			transition: all 0.2s ease;
			.table-extends-wrapper{
				transition: all 0.2s ease;
			}
			&:nth-of-type(odd) {
				background-color: #efefef;
				.table-extends-wrapper{
					background-color: #efefef;
				}
			}
			&:hover {
				color: var(--gold-color);
				cursor:pointer;
			}		
			`,
    BaseCell: `
			padding: 5px;
			height: 80px;
			`,
    HeaderCell: ``,
    Cell: ``,
  };
  const theme = useTheme(THEME);

  // --- sort data
  let sorting: Record<string, SortFn> = {};
  rows.forEach((item) => {
    if (item.sortType === "number") {
      sorting = {
        ...sorting,
        [item.name]: (array: TableNode[]) =>
          array.sort((a, b) => a[item.name] - b[item.name]),
      };
    } else if (item.sortType === "string") {
      sorting = {
        ...sorting,
        [item.name]: (array: TableNode[]) =>
          array.sort((a, b) => a[item.name].localeCompare(b[item.name])),
      };
    } else if (item.sortType === "length") {
      sorting = {
        ...sorting,
        [item.name]: (array: TableNode[]) =>
          array.sort((a, b) => a[item.name].length - b[item.name].length),
      };
    }
  });
  const sort = useSort(
    data,
    {
      state: { sortKey: "", reverse: false },
    },
    {
      sortFns: sorting,

      sortIcon: {
        iconDefault: <FaSort />,
        iconUp: <FaSortUp />,
        iconDown: <FaSortDown />,
      },
    }
  );

  // ----pagination data
  const LIMIT = 4;
  const pagination = usePagination(
    data,
    {
      state: {
        page: 0,
        size: LIMIT,
      },
    },
    {
      isServer: false,
    }
  );

  return (
    <>
      <Table
        data={data}
        theme={theme}
        layout={{ fixedHeader: false }}
        sort={sort}
        pagination={pagination}
      >
        {(tableList: TableNode[]) => (
          <>
            <Header>
              <HeaderRow>
                {rows.map((item) =>
                  item.sortType === null ? (
                    <HeaderCell>{item.title}</HeaderCell>
                  ) : (
                    <HeaderCellSort sortKey={item.name}>
                      {item.title}
                    </HeaderCellSort>
                  )
                )}
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item: TableNode) => (
                <Row
                  key={item.id}
                  item={item}
                  onClick={() => handleExpand(item)}
                >
                  {rows.map((i) => (
                    <Cell key={i.name}>{i.content(item)}</Cell>
                  ))}

                  {ids.includes(item.id) && (
                    <tr className="table-extends-wrapper">
                      <td>
                        <ul>
                          {expands.map((i) => (
                            <li key={i.name}>
                              <strong>{i.title} :</strong> {i.content(item)}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>

      <div className="table-pagination-wrapper">
        صفحه:{" "}
        {pagination.state.getPages(data.nodes).map((_: any, index: number) => (
          <button
            key={index}
            type="button"
            className={`page ${
              pagination.state.page === index ? "active" : ""
            }`}
            onClick={() => pagination.fns.onSetPage(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}
