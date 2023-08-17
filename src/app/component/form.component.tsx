import FormButton from './form-button.component';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight/lib';

type FormProps = {
  title: string;
  titleValue: string;
  descriptionValue: string;
  handleSubmit: () => void;
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
};

const Form = ({
  title,
  titleValue,
  descriptionValue,
  handleSubmit,
  handleChange,
}: FormProps) => {
  return (
    <div className={'w-screen m-auto flex my-4 relative'}>
      <div
        className={'flex flex-col justify-center items-center m-auto w-full'}
      >
        <p className={'xs:text-3xl md:text-5xl text-slate-200 font-bold p-3'}>
          {title}
        </p>
        <div
          className={
            'flex w-full p-10 py-6 lg:space-x-8 h-full xs:flex-col lg:flex-row justify-center xs:items-center lg:items-start'
          }
        >
          <form
            className={
              'xs:text-left md:text-left lg:w-[50%] h-full xs:w-[100%]'
            }
          >
            <input
              value={titleValue}
              type="text"
              name="title"
              placeholder="Enter Title"
              className={'rounded-md px-4 w-full py-2 my-2 outline-none'}
              required
              onChange={handleChange}
              autoFocus
              maxLength={50}
            />
            <textarea
              value={descriptionValue}
              name="description"
              placeholder="Enter Description"
              className={
                'rounded-md px-4 py-2 w-full my-2 h-[30rem] resize-none outline-none'
              }
              required
              onChange={handleChange}
            ></textarea>
            <span className={'text-slate-200 sm:text-xs lg:text-base'}>
              * Support MarkDown
            </span>
          </form>
          <div className={'flex flex-col lg:w-[50%] xs:w-[100%]'}>
            <div className="text-slate-200 rounded-md lg:px-4 w-full py-2 my-2 h-10">
              <p className={'font-semibold text-2xl'}>
                {!titleValue ? 'Preview blog' : titleValue}
              </p>
            </div>
            <div
              className={
                'bg-white rounded-md px-4 py-2 w-full my-2 h-[30rem] overflow-scroll break-words'
              }
            >
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {descriptionValue}
              </ReactMarkdown>
            </div>
            <div
              className={
                'flex xs:flex-col sm:flex-row md:flex-row-reverse justify-between items-center mt-2 w-full'
              }
            >
              <FormButton buttonType="submit" onClick={handleSubmit}>
                Submit
              </FormButton>
              <Link
                href={'/'}
                className={`font-semibold text-slate-200 mt-3 px-4 py-2 shadow-xl bg-red-500 
    rounded-lg m-auto hover:bg-red-400 xs:w-4/5 md:w-full lg:w-fit lg:m-0 text-center`}
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
