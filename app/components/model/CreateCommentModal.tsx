import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { IoIosClose } from 'react-icons/io';

interface CreateCommentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { comment: string } | string) => void;
}

const CreateCommentModal: React.FC<CreateCommentModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
}) => {
    const {
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            comment: '',
        },
    });

    const onFormSubmit = (data: { comment: string }) => {
        if (data.comment) {
            onSubmit(data);
            reset();
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 m-5">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Add Comments</h2>
                    <button className="text-brand-green500" onClick={onClose}>
                        <IoIosClose className="w-7 h-7" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="mb-4">
                        <Controller
                            name="comment"
                            control={control}
                            rules={{ required: 'Comment is required' }}
                            render={({ field }) => (
                                <textarea
                                    {...field}
                                    placeholder="What's on your mind..."
                                    className="w-full min-h-32 px-4 py-2 border rounded-lg focus:outline-none ring-1 ring-[#DADADA]"
                                    rows={4}
                                />
                            )}
                        />
                        {errors.comment && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.comment.message}
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

export default CreateCommentModal;
