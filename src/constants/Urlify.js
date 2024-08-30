import { Link } from "react-router-dom";

export const urlify = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <Link key={index} target="_blank" to={part} rel="noopener noreferrer">
          {part}
        </Link>
      );
    }
    return part;
  });
};
