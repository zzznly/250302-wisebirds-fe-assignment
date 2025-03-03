import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import SelectBox from '@/components/SelectBox';
import { USER_ROLES } from '@/constants';
import { useAppStore } from '@/stores';
import CustomButton from '@/components/CustomButton';

const pages = [
  { name: '캠페인', path: '/' },
  { name: '사용자', path: '/user' },
];

export default function Header() {
  const { userInfo, userRole, setUserRole } = useAppStore();

  const Navigation = () => (
    <>
      {pages.map(page => (
        <CustomButton key={page.name} href={page.path}>
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
    <SelectBox value={userRole}>
      {USER_ROLES.map(role => (
        <SelectBox.Option key={role.value} value={role.value} onClick={() => setUserRole(role.value)}>
          {role.label}
        </SelectBox.Option>
      ))}
    </SelectBox>
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
