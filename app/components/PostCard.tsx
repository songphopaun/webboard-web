import { FaRegComment } from 'react-icons/fa';

type PostCardProps = {
    author: string;
    community: string;
    title: string;
    content: string;
    comments: number;
    isFirst?: boolean;
    isLast?: boolean;
    searchQuery?: string;
};

export default function PostCard({
    author,
    community,
    title,
    content,
    comments,
    isFirst = false,
    isLast = false,
    searchQuery = '',
}: PostCardProps) {
    const highlightText = (text: string, query: string) => {
        if (!query) return text;
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return (
            <>
                {parts.map((part, index) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                        <mark key={index} className="bg-yellow-200">
                            {part}
                        </mark>
                    ) : (
                        part
                    )
                )}
            </>
        );
    };

    return (
        <div
            className={`bg-white p-6 border-gray-200 ${
                isFirst ? 'rounded-t-lg border-t' : ''
            } ${isLast ? 'rounded-b-lg border-b' : 'border-b'}`}
        >
            <div className="flex flex-col">
                <div className="flex items-center mb-3">
                    <img
                        src=" https://i.pravatar.cc/300"
                        alt={`${author}'s avatar`}
                        className="w-12 h-12 rounded-full"
                    />

                    <h4 className="pl-2 text-sm font-medium text-base-grey300 ">
                        {author}
                    </h4>
                </div>
                <span className="text-base-grey text-xs font-normal font-ibm pl-2">
                    {community}
                </span>
                <h3 className="text-base text-[#101828] font-semibold mt-2">
                    {highlightText(title, searchQuery)}
                </h3>
                <p className="text-xs  text-[#101828] mt-1">{content}</p>
                <div className="flex items-center text-gray-500 text-sm mt-2">
                    <FaRegComment className="mr-2" />
                    {comments} Comments
                </div>
            </div>
        </div>
    );
}
