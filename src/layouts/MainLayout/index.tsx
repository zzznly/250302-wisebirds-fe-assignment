import Header from '@/components/Header';
import { Container } from '@mui/system';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Container sx={{ py: 8 }}>{children}</Container>
    </>
  );
}
