const TypingLoader = () => {
  return (
    <div className="flex h-5 items-center justify-center space-x-1 px-2">
      <div
        className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary-500"
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary-500"
        style={{ animationDelay: "100ms" }}
      ></div>
      <div
        className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary-500"
        style={{ animationDelay: "200ms" }}
      ></div>
    </div>
  );
};

export default TypingLoader;
