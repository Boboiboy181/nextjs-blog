type ConfirmType = {
  idToDelete: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: (id: string) => void;
};

const Confirm = ({ idToDelete, setIsOpen, handleDelete }: ConfirmType) => {
  const handleConfirm = () => {
    handleDelete(idToDelete);

    setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  };

  return (
    <div
      className={
        'text-slate-200 fixed z-20 top-0 left-0 bg-slate-600 w-full h-full bg-opacity-[.5]'
      }
    >
      <div
        className={
          'absolute top-0 left-0 right-0 bottom-0 h-40 w-72 bg-white rounded-md m-auto'
        }
      >
        <div className={'flex flex-col justify-center items-center h-full'}>
          <h1 className={'text-2xl font-semibold text-slate-900'}>
            Are you sure ?
          </h1>
          <div className={'flex space-x-5 mt-4'}>
            <button
              className={
                'bg-slate-700 hover:bg-slate-600 font-semibold text-white px-4 py-2 rounded-md mr-2'
              }
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className={
                'bg-red-600 hover:bg-red-500 font-semibold text-white px-4 py-2 rounded-md'
              }
              onClick={handleConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
