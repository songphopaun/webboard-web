import React from 'react';

interface DeletePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

const DeletePostModal: React.FC<DeletePostModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 m-5 flex flex-col items-center justify-center gap-y-3">
                <h2 className="text-xl font-semibold text-center">
                    Please confirm if you wish to delete the post
                </h2>
                <span className="font-normal text-sm text-[#5B5B5B] text-center">
                    Are you sure you want to delete the post? Once deleted, it
                    cannot be recovered.
                </span>
                <div className="flex flex-col-reverse sm:flex-row justify-center mt-5 w-full sm:space-x-3 ">
                    <button
                        type="button"
                        className="w-full mt-3 sm:mt-0 sm:w-32 h-10 text-[#5B5B5B] rounded-lg ring-1 ring-[#DADADA] font-ibm font-semibold text-sm "
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="w-full sm:w-32 h-10 bg-[#F23536] text-white rounded-lg font-ibm font-semibold text-sm "
                        onClick={onSubmit}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeletePostModal;
