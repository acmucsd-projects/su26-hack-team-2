import Navbar from '@/components/ui/Navbar';
import TestAvatar from './test-avatar.jpg';

export default function NavbarTestPage() {
    return (
        <div className='flex flex-col gap-10'>
            <Navbar variant='landing' />
            <Navbar variant='startingClub'/>
            <Navbar variant='boardMember' userName='Shiloh H' />
            <Navbar variant='boardMember' userName='Shiloh H' userImageUrl={TestAvatar.src} />
        </div>
    );
}