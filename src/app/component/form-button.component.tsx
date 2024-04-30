import React from 'react';

type FormButtonProps = {
  buttonType: 'submit' | 'button';
  children: React.ReactNode;
  onClick?: () => void;
};

const FormButton = ({ buttonType, children, onClick }: FormButtonProps) => {
  const submitTypeStyles = `font-semibold px-4 py-2 shadow-xl text-white bg-slate-900 rounded-lg 
    m-auto hover:bg-slate-200 xs:w-4/5 md:w-full lg:w-fit lg:m-0 hover:text-slate-900`;
  const backTypeStyles = `font-semibold text-slate-200 mt-3 px-4 py-2 shadow-xl bg-red-500 
    rounded-lg m-auto hover:bg-red-400 xs:w-4/5 md:w-full lg:w-fit lg:m-0`;

  return (
    <button
      className={buttonType === 'submit' ? submitTypeStyles : backTypeStyles}
      type={buttonType}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default FormButton;
