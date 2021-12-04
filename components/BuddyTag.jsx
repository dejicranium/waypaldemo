import Icon from './common/Icon';

const BuddyTag = ({ tags, removeBuddyTag }) => {
  return (
    <div className='tags-input'>
      <ul className='flex flex-wrap'>
        {tags.map((tag, index) => {
          return (
            <li
              key={index}
              className='mt-6 bg-orange-white text-orange rounded-full py-2 px-4 mr-6 border-pill flex items-center'
            >
              <span className='block'>{tag}</span>
              <Icon
                icon='remove-tag'
                cname='ml-2 mt-2 cursor-pointer'
                handleClick={() => removeBuddyTag(tag)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BuddyTag;
