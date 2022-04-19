export function timeTableColumnsGenerator(handleDelete){
    const columns = [
        {
          name: 'Név',
          selector: row => row.name,
          sortable: true
        },
        {
          name: 'Kezdés',
          selector: row => row.start,
        },
        {
          name: 'Vége',
          selector: row => row.end,
        },
        {
          name: 'Státusz',
          selector: row => row.status,
          sortable: true
        },
        {
          name: 'Dátum',
          selector: row => row.date,
          sortable: true
        },
        {
          name: ' ',
          ignoreRowClick: true,
          cell: row => <button className="delete-button" onClick={e => handleDelete(row, e)}>{row.delete}</button>
        },
    
      ];

return columns;
};
