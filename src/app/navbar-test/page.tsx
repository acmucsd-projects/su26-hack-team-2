import Navbar from '@/components/ui/Navbar';
import TestAvatar from './test-avatar.jpg';

export default function NavbarTestPage() {
    return (
        <div className='flex flex-col gap-10'>
            <Navbar variant='transparent' />
            <Navbar variant='cream' />
            <Navbar variant='cream' isAuthenticated userName='Shiloh H' />
            <Navbar variant='cream' isAuthenticated userName='Shiloh H' userImageUrl={TestAvatar.src} />
        </div>
    );
}
