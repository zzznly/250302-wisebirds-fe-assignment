import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import CustomSelect from '@/components/CustomSelect';
import CustomButton from '@/components/CustomButton';
import { USER_ROLES } from '@/constants';
import { useAppStore } from '@/stores';

const pages = [
  { name: '캠페인', path: '/' },
  { name: '사용자', path: '/user' },
];

export default function Header() {
  const { userInfo, userRole, setUserRole } = useAppStore();

  const Navigation = () => (
    <>
      {pages.map(page => (
        <CustomButton key={page.name} href={page.path} color="white">
          {page.name}
        </CustomButton>
      ))}
    </>
  );

  const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleUserMenuClose = () => {
      setAnchorEl(null);
    };

    return (
      <>
        <CustomButton onClick={handleUserMenuOpen}>{userInfo?.email || 'Loading...'}</CustomButton>
        <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleUserMenuClose}>
          <Box sx={{ px: 2, textAlign: 'center' }}>
            <Typography>{userInfo?.name}</Typography>
            <Typography>{userInfo?.email}</Typography>
            <Typography>{userInfo?.company?.name}</Typography>
          </Box>
        </Menu>
      </>
    );
  };

  const RoleSelect = () => (
    <CustomSelect value={userRole}>
      {USER_ROLES.map(role => (
        <CustomSelect.Option key={role.value} value={role.value} onClick={() => setUserRole(role.value)}>
          {role.label}
        </CustomSelect.Option>
      ))}
    </CustomSelect>
  );

  return (
    <AppBar>
      <Container>
        <Toolbar>
          <Typography
            component="a"
            href="/"
            sx={{
              mr: 4,
            }}
          >
            Wisebirds
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <Navigation />
          </Box>
          <Box sx={{ mr: 2 }}>
            <UserMenu />
          </Box>
          <RoleSelect />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
