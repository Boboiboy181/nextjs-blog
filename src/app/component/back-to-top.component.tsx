type BackToTopProps = {
  showBtn: boolean;
  backToTop: () => void;
};

const BackToTop = ({ showBtn, backToTop }: BackToTopProps) => {
  return (
    <div
      onClick={backToTop}
      className={`text-slate-900 h-14 bg-slate-400 w-14 rounded-[50%] text-2xl text-center leading-[52px] 
        cursor-pointer fixed bottom-0 right-5 hover:bg-slate-200 z-10 opacity-0 transition-all duration-300 ${
          showBtn ? 'active' : 'no-active'
        } `}
    >
      <span>&uarr;</span>
    </div>
  );
};

export default BackToTop;
