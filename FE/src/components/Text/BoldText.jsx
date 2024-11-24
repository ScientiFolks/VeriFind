function BoldText({ text }) {
    const parseBoldText = (text) => {
        const parts = text.split(/\*\*(.*?)\*\*/g); // Splits by `**text**`
        return parts.map((part, index) =>
          index % 2 === 1 ? (
            <strong key={index} className="font-bold text-gradient-3">
              {part}
            </strong>
          ) : (
            part
          )
        );
      };
    
      return <p>{parseBoldText(text)}</p>;
}

export default BoldText;