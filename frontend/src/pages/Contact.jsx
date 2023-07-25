import * as AiIcons from "react-icons/ai";

export default function Contact() {
  const emailAddress = "marionbaston84@gmail.com";

  return (
    <div className="flex w-full">
      <a href={`mailto:${emailAddress}`}>
        <button type="button" className="flex gap-4">
          <AiIcons.AiOutlineMessage />
          Contact
        </button>
      </a>
    </div>
  );
}
