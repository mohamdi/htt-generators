export const isFirstColumn = function(params: any) {
  const displayedColumns = params.columnApi.getAllDisplayedColumns();
  return displayedColumns[0] === params.column;
};
