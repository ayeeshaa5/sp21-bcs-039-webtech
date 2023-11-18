
const CustomButton = ({title, containerStyles, iconRight, type, onclick})=> {
    return (
        <button

        type={type || 'button'}
        className={`inline-flex items-centre text-base ${containerStyles}`}
        onClick={onclick}
        >
            {title}
            {iconRight && <div className="ml-2">{iconRight}</div>}
        </button>
    );
};

export default CustomButton;