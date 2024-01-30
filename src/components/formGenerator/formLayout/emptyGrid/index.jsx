import Grid from '@mui/material/Grid';

const EmptyGrid = ({
  alignment
}) => {
  const {
    xs, sm, md, lg, xl
  } = alignment;
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} />
  );
};

export default EmptyGrid;
