interface InputProps {
  title: string;
  placeholder?: string;
  required: boolean;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  title,
  placeholder,
  required,
  type,
  onChange,
}: InputProps) => {
  const name = title.toLowerCase().replace(" ", "_");
  return (
    <>
      <label
        className="-mb-[2px] mt-1 font-albertSans leading-none"
        htmlFor={name}
      >
        {title}
      </label>
      <input
        className="w-full font-albertSans text-drk px-3 py-2 rounded-lg shadow-inner shadow-black border border-white"
        id={name}
        type={type}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
};
