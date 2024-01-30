import React from 'react';
import styled from '@emotion/styled';

  interface LabelProps{
    input: any;
  }

const CustomTitle = styled.div(() => ({
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: '20px'
}));

const Label = (props: LabelProps) => {
  const {
    input,
  } = props;
  return (
    <CustomTitle>
      {input?.name}
    </CustomTitle>
  );
};

export default Label;
