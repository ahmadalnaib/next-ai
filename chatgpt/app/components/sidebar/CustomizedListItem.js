import { ListItem } from '@mui/material';

export default function CustomizedListItem(props) {
  const [open, setOpen] = React.useState(false);


  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={()=>setOpen(!open)}>
          <ListItemText primary='' />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>

      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Starred' />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
}
