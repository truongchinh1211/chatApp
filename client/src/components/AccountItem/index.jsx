import PropTypes from 'prop-types'
import Avatar from '../Avatar';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'
import { useState } from 'react';
function AccountItem({ item }) {
    const [visible, setVisible] = useState(false);

    const handleClick = () => {
        setVisible(!visible);
    };
    return (
        <div>
        <Tippy 
           render={(attrs) => (
            <div
              className="p-4 w-64 bg-white shadow-lg rounded-lg"
              tabIndex="-1"
              {...attrs}
            >
              <h2 className="font-bold text-lg">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.email}</p>
            </div>
          )}
            interactive = {true}
            visible = {visible}
            onClickOutside={()=> setVisible(false)}
        >
        <div key = {item._id} onClick={handleClick} className='flex flex-row items-center px-4 py-2 hover:bg-slate-300'>
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
        </Tippy>
        
        </div>
    );
}
AccountItem.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        profilePic: PropTypes.string,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired,
}

export default AccountItem;