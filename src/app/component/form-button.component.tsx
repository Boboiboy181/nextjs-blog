type FormButtonProps = {
  text: string;
  buttonType: 'submit' | 'button';
  onClick?: () => void;
};

const FormButton = ({ text, buttonType, onClick }: FormButtonProps) => {
  const submitTypeStyles = `font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg 
    m-auto hover:bg-slate-100 xs:w-4/5 md:w-full lg:w-fit lg:m-0`;
  const backTypeStyles = `font-semibold text-slate-200 mt-3 px-4 py-2 shadow-xl bg-red-500 
    rounded-lg m-auto hover:bg-red-400 xs:w-4/5 md:w-full lg:w-fit lg:m-0`;

  return (
    <button
      className={buttonType === 'submit' ? submitTypeStyles : backTypeStyles}
      type={buttonType}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default FormButton;
