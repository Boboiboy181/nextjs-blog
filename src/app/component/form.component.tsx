import { MutableRefObject } from 'react';
import FormButton from './form-button.component';

type FormProps = {
  title: string;
  titleRef: MutableRefObject<HTMLInputElement | null>;
  descriptionRef: MutableRefObject<HTMLTextAreaElement | null>;
  handleSubmit: (e: any) => void;
  handleBackBtn: () => void;
};

const Form = ({
  title,
  titleRef,
  descriptionRef,
  handleSubmit,
  handleBackBtn,
}: FormProps) => {
  return (
    <div className={'w-full m-auto flex my-4'}>
      <div className={'flex flex-col justify-center items-center m-auto'}>
        <p className={'xs:text-3xl md:text-5xl text-slate-200 font-bold p-3'}>
          {title}
        </p>
        <form onSubmit={handleSubmit} className={'xs:text-center md:text-left'}>
          <input
            ref={titleRef}
            placeholder="Enter Title"
            type="text"
            className={'rounded-md px-4 xs:w-4/5 md:w-full py-2 my-2 '}
          />
          <textarea
            ref={descriptionRef}
            placeholder="Enter Description"
            className={'rounded-md px-4 py-2 xs:w-4/5 md:w-full my-2'}
          ></textarea>
          <div
            className={
              'flex xs:flex-col sm:flex-row md:flex-row-reverse justify-between items-center'
            }
          >
            <FormButton text={'Submit'} buttonType="submit" />
            <FormButton text={'Back'} buttonType="button" onClick={handleBackBtn} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
