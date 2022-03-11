import DataTable from 'react-data-table-component';


export default function Table({data,columns,paginationProp}) {

    console.log("data: ",data)
    console.log("columns: ",columns)
    return (
        <DataTable
            columns={columns}
            data={data}
            pagination={paginationProp ? (true): (false)}
        />
    );
};