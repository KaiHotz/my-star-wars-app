import { getCSSVariable } from './getCSSVariable';

export const highlightText = ({ highlight, text }: { highlight: string; text?: string }) => {
  const parts = text?.split(new RegExp(`(${highlight})`, 'gi'));

  return (
    <span>
      {parts?.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === highlight.toLowerCase()
              ? { color: getCSSVariable('--orange-3'), fontWeight: 'bolder' }
              : undefined
          }
        >
          {part}
        </span>
      ))}
    </span>
  );
};
