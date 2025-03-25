import Spinner from "@/components/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTableViewQuery } from "@/services/filters/filtersApi";
import { Link } from "react-router-dom";

interface TableViewProps {
  ids: string[];
}

const TableView = ({ ids }: TableViewProps) => {
  const idsString = ids.map((id) => `ids=${id}`).join("&");
  const { data: tableData, isLoading } = useGetTableViewQuery(idsString);
  
  if (isLoading) {
    return (
        <Spinner className="min-h-[60vh]"/>
    );
  }
  if (!tableData) {
    return <div>No data available</div>;
  }

  return (
    <div className="max-w-[calc(100vw-10rem)] max-h-[calc(100vh-170px)] overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>HTA Decision DT</TableHead>
            <TableHead>Primary Disease</TableHead>
            <TableHead>Treatment Line</TableHead>
            <TableHead>RWE Used</TableHead>
            <TableHead>Final Recommendation</TableHead>
            <TableHead>HTA Status</TableHead>
            <TableHead>Quintiles Link</TableHead>
            <TableHead>Web URL</TableHead>
            <TableHead>Reimbursed Indication</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((item: any) => (
            <TableRow key={item.ID}>
              <TableCell>{item.ID}</TableCell>
              <TableCell>{item.COUNTRY}</TableCell>
              <TableCell>{item.HTA_DECISION_DT}</TableCell>
              <TableCell className="min-w-[140px]">
                {item.PRIMARY_DISEASE}
              </TableCell>{" "}
              <TableCell className="min-w-[180px]">
                {item.TREATMENT_LINE}
              </TableCell>
              <TableCell>{item.RWE_USED}</TableCell>
              <TableCell>{item.FINAL_RECOMMENDATION}</TableCell>
              <TableCell>{item.HTA_STATUS}</TableCell>{" "}
              <TableCell>
                <Link
                  to={item.QUINTILES_LINK}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  Link
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  to={item.WEB_URL}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  Link
                </Link>
              </TableCell>
              <TableCell className="w-[35%] text-ellipsis">
                {item.REIMBURSED_INDICATION}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableView;
