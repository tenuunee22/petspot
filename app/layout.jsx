import './globals.css';
import Navbar from './components/Navbar';
import AuthProvider from '../context/AuthContext';

export const metadata = {
  title: 'Nohoi Help',
  description: 'Алга болсон/олсон нохой хайх',
};

export default function RootLayout({ children }) {
  return (
    <html lang="mn">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
