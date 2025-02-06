import ReactMarkdown from "react-markdown";

interface Props {
  children: string;
}

function MarkdownContent({ children }: Props) {
  return (
    <div>
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1
              className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-3xl font-bold mb-4 text-blue-600" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="text-2xl font-semibold mb-3 text-primary-700"
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p
              className="mb-4 leading-7 text-gray-700 custom-paragraph"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-none mb-4 space-y-2 text-gray-700" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-none mb-4 space-y-2 text-gray-700" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">•</span>
              <span {...props} />
            </li>
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-blue-300 pl-4 py-2 mb-4 italic text-gray-600 bg-blue-50 rounded-r"
              {...props}
            />
          ),
          a: ({ node, ...props }) => (
            <a
              className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
              {...props}
            />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownContent;
