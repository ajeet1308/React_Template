import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import styled from '@emotion/styled';
import DeleteIcon from '@mui/icons-material/Delete';
import { icons } from '../../icons';

const CustomDeleteIcon = styled(DeleteIcon)(() => ({
  color: '#d85151'
}));

const ListStyled = styled(List)(() => ({
  paddingTop: '0px',
  paddingBottom: '0px'
}));

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  color: theme.input.primary,
  backgroundColor: theme.input.secondary,
  paddingTop: '0px',
  paddingBottom: '0px',
  height: '57px',
  borderRadius: '5px'
}));

const Atag = styled.a`
  text-decoration: none;
  color: #502A74!important;
`;

const CustomFileList = (props) => {
  // const removeFileName = (url) => {
  //   const params = url.split('/');
  //   const newUrl = params.slice(0, params.length - 1).join('/');
  //   return newUrl;
  // };
  // const extractFileName = (url) => {
  //   const params = url.split('/');
  //   return params[params.length - 1];
  // };
  const { img, removeImg } = props;
  console.log(img, 'imag');
  return (
    <ListStyled dense={false}>
      {img.map((obj, index) => (
        <ListItemStyled
          secondaryAction={
                  (
                    <IconButton edge='end' aria-label='delete' onClick={() => removeImg(index)}>
                      <CustomDeleteIcon />
                    </IconButton>
                  )
                }
        >
          <ListItemAvatar>
            <Avatar>
              {obj?.type === 'application/pdf' ? icons.PictureAsPdfSharpIcon : icons.ImageSharpIcon}
            </Avatar>
          </ListItemAvatar>
          <Atag href={obj?.file_url} target='_blank'>
            <ListItemText
              primary={obj?.file_name}
            />
          </Atag>
        </ListItemStyled>
      ))}
    </ListStyled>
  );
};

export default CustomFileList;
