import { ReactComponent  as ReactLogoArrow } from '../assets/angle-right-solid.svg'

function NavButton({ direction, handleScroll, disabled }) {
    const placement = direction === 'right' ? {
        gridColumn: '3 / 3',
        marginLeft: 'auto',
    } : {
        gridColumn: '1 / 1',
        marginRight: 'auto',
        transform: [{ rotate: '180deg'}]
    }

    const logoStyle = `w-5 h-5 md:w-8 md:h-8 lg:w-10 lg:h-10 outline-none
    fill-white group-hover:fill-black opacity-40 
    group-hover:opacity-80 duration-150` +
    (direction === 'right' ? '' : ' rotate-180');

    return (
        <button onClick={handleScroll} disabled={disabled}
        className='group w-5 h-5 md:w-8 md:h-8 lg:w-10 lg:h-10 z-50 sticky top-[46%] bg-black opacity-40
        rounded-full hover:bg-white hover:bg-opacity-80 row-span-full duration-150 disabled:hidden'
        style={placement}>
            <ReactLogoArrow className={logoStyle} />
        </button>
    );
  }
  
  export default NavButton;