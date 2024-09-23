import PropTypes from 'prop-types'
import Avatar from '../Avatar';
function AccountItem({ children = [] }) {
    return (
        <>
        {children.map((item) => (
        <div key = {item.id}
         className='flex flex-row items-center cursor-pointer px-4 py-2 hover:bg-slate-300'>
                <span className='w-[40px] h-[40px] rounded-full overflow-hidden me-2'>
                <Avatar
                    avatar={item.profilePic}
                    alt="Avatar" 
                    className='w-full h-full object-cover' 
                />
                </span>
                <div className={'w-full'}>
                    <div className={'flex flex-col'}>
                        <div className="flex flex-row items-center">
                            <h1 className={'font-semibold text-[1rem] me-1 '}>{item.name}</h1>
                        </div>
                        <p className={'text-[14px] leading-[18px] text-stone-500'} >{item.email}</p>
                        
                    </div>
                </div>
        </div>
        ))}
            
        </>
    );
}
AccountItem.propTypes = {
    children: PropTypes.arrayOf(
        PropTypes.shape({
            profilePic: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ),
};

export default AccountItem;