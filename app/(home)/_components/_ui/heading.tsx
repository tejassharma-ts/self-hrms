interface HeadingProps {
  mainText: string;
  subText?: string;
  className?: string;
}

export default function Heading({ mainText, subText, className }: HeadingProps) {
  return (
    <h1 className={`mb-2 text-6xl font-bold leading-[1.2] text-white ${className}`}>
      {mainText}
      {subText ? (
        <>
          <br />
          {subText}
        </>
      ) : null}
    </h1>
  );
}
