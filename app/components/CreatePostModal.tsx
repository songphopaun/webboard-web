import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { IoIosArrowDown, IoIosClose, IoIosCheckmark } from 'react-icons/io';

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: {
        communityId: number;
        title: string;
        content: string;
    }) => void;
    listCommunity: { id: number; name: string }[];
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    listCommunity,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const {
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            communityId: 0,
            title: '',
            content: '',
        },
    });

    const communityId = watch('communityId');

    const handleDropdownSelect = (id: number) => {
        setValue('communityId', id);
        setIsDropdownOpen(false);
    };

    const onFormSubmit = (data: {
        communityId: number;
        title: string;
        content: string;
    }) => {
        if (data.communityId && data.title && data.content) {
            onSubmit(data);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Create Post</h2>
                    <button className="text-brand-green500" onClick={onClose}>
                        <IoIosClose className="w-7 h-7" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="relative mb-4">
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full sm:w-auto min-w-56 min-h-10 px-4 py-2 flex items-center justify-center gap-2 text-sm font-semibold font-ibm text-base-success ring-2 ring-base-success rounded-lg"
                        >
                            {communityId
                                ? listCommunity.find(
                                      (c) => c.id === communityId
                                  )?.name
                                : 'Choose a community'}
                            <IoIosArrowDown
                                className={`transition-transform duration-200 ${
                                    isDropdownOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute top-full mt-1 w-full max-h-80 overflow-y-auto bg-white rounded-lg shadow-lg py-1 z-10">
                                {listCommunity.map((item, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                                        onClick={() =>
                                            handleDropdownSelect(item.id)
                                        }
                                    >
                                        <span className="flex items-center justify-between">
                                            {item.name}
                                            {communityId === item.id && (
                                                <IoIosCheckmark className="text-[#4A4A4A] w-7 h-7" />
                                            )}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {errors.communityId && (
                            <p className="text-red-500 text-sm mt-1">
                                Please choose a community.
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <Controller
                            name="title"
                            control={control}
                            rules={{ required: 'Title is required' }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    placeholder="Title"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none ring-1 ring-[#DADADA]"
                                />
                            )}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <Controller
                            name="content"
                            control={control}
                            rules={{ required: 'Content is required' }}
                            render={({ field }) => (
                                <textarea
                                    {...field}
                                    placeholder="What's on your mind..."
                                    className="w-full min-h-56 px-4 py-2 border rounded-lg focus:outline-none ring-1 ring-[#DADADA]"
                                    rows={4}
                                />
                            )}
                        />
                        {errors.content && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.content.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                        <button
                            type="button"
                            className="w-full sm:w-24 h-10 text-base-success rounded-lg ring-1 ring-base-success font-ibm font-semibold text-sm hover:ring-brand-green500 hover:text-brand-green500"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full sm:w-24 h-10 bg-base-success text-white rounded-lg font-ibm font-semibold text-sm hover:bg-brand-green500"
                        >
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePostModal;
