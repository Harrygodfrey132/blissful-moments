import React, { useState, useRef, useEffect } from "react";
import { TiDelete } from "react-icons/ti";

// Define a type for contributions
type Contribution = {
    name: string;
    message: string;
};

const Contributions = () => {
    // State to toggle the Contributions feature
    const [isContributionsEnabled, setIsContributionsEnabled] = useState(true);

    // State to store the list of contributions
    const [contributions, setContributions] = useState<Contribution[]>([]);

    // State to toggle the popover form
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    // State to hold form inputs
    const [formInputs, setFormInputs] = useState<Contribution>({
        name: "",
        message: "",
    });

    // Popover reference to handle outside clicks
    const popoverRef = useRef<HTMLDivElement>(null);

    // Close popover when clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsPopoverOpen(false);
            }
        };

        // Listen for click events on the document
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Function to add a contribution
    const addContribution = () => {
        if (formInputs.name && formInputs.message) {
            setContributions((prev) => [...prev, formInputs]);
            setFormInputs({ name: "", message: "" });
            setIsPopoverOpen(false); // Close the popover
        }
    };

    // Function to delete a contribution
    const deleteContribution = (index: number) => {
        setContributions((prev) => prev.filter((_, i) => i !== index));
    };

    // Function to handle changes in the contribution (editable fields)
    const handleContributionChange = (
        index: number,
        field: keyof Contribution,
        value: string
      ) => {
        const updatedContributions = [...contributions];
        updatedContributions[index][field] = value;
        setContributions(updatedContributions);
      };
    return (
        <div className="mb-[300px]">
            {/* Toggle Contributions Switch */}
            <div className="md:flex gap-5 justify-end items-center">
                {/* Button to open the popover form */}
                {isContributionsEnabled && (
                    <div className="relative" ref={popoverRef}>
                        <button
                            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                            className="text-white add-button px-6 py-2.5 font-playfair"
                        >
                            Add Contribution
                        </button>

                        {/* Inline popover form with arrow */}
                        {isPopoverOpen && (
                            <div className="popover-container transition-all">
                                <div className="popover-arrow"></div>
                                <h2 className="text-xl font-medium mb-4">Create a Contribution</h2>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Insert Name or Connection"
                                    value={formInputs.name}
                                    onChange={handleInputChange}
                                    className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                                />
                                <textarea
                                    name="message"
                                    placeholder="Please post your personalized message"
                                    value={formInputs.message}
                                    onChange={handleInputChange}
                                    className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                                    rows={4}
                                />
                                <button
                                    onClick={addContribution}
                                    className="text-white add-button px-4 py-2.5"
                                >
                                    Add Contribution
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Toggle Switch for Enabling Contributions */}
                <div className="flex md:order-2 order-1 justify-end">
                    <div className="flex items-center md:gap-2 md:space-x-4 space-x-2">
                        <div className="relative inline-block w-12 font-playfair align-middle select-none transition-all duration-200 ease-in">
                            <input
                                type="checkbox"
                                id="toggle-contributions"
                                checked={isContributionsEnabled}
                                onChange={() => setIsContributionsEnabled(!isContributionsEnabled)}
                                className="toggle-checkbox absolute block md:w-8 w-6 md:h-8 h-6 rounded-full bg-gray-100 border-4 appearance-none cursor-pointer transition-all duration-200 ease-in-out"
                            />
                            <label
                                htmlFor="toggle-contributions"
                                className={`toggle-label block overflow-hidden md:h-8 h-6 md:!w-16 !w-12 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${isContributionsEnabled ? "bg-blue-light-900" : "bg-gray-300"
                                    }`}
                            ></label>
                        </div>
                        <span className="md:text-3xl text-xl font-playfair font-medium text-blue-light-900">
                            Contributions
                        </span>
                    </div>
                </div>
            </div>

            {/* Editable Header */}
            <h1 className="md:text-2xl md:order-1 order-2 text-2xl flex gap-4 font-playfair font-medium mb-6 mt-4">
                <span
                    className={`border border-dashed w-full bg-[#f8f8f8] text-blue-light-900 p-3 border-gray-300 focus:outline-none focus:border-gray-500 ${isContributionsEnabled ? "" : "text-gray-500 cursor-not-allowed"
                        }`}
                    contentEditable={isContributionsEnabled}
                    suppressContentEditableWarning
                    aria-label="Contributions Title"
                >
                    This is a place to celebrate the life of and their impact on all of us. Please post respectfully.
                </span>
            </h1>

            {/* misonery gallery */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="grid gap-4">
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" alt=""></img>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" alt=""></img>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" alt=""></img>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" alt=""></img>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" alt=""></img>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" alt=""></img>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg" alt=""></img>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" alt=""></img>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" alt=""></img>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg" alt=""></img>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg" alt=""></img>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg" alt=""></img>
                    </div>
                </div>
            </div> */}

            {/* Display Contributions */}
            {isContributionsEnabled && contributions.length > 0 && (

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                    

                        {contributions.map((contribution, index) => (
                            <div className="grid gap-4">
                            <div
                                key={index}
                                className={`p-6 border h-auto border-gray-300 max-w-full rounded-lg rounded-lg bg-[#f8f8f8] shadow-md transition-transform ${index % 2 === 0 ? "translate-y-4" : "-translate-y-4"
                                    }`}
                            >
                                <button
                                    onClick={() => deleteContribution(index)}
                                    className="absolute top-2 right-2 text-red-600"
                                    aria-label="Delete Contribution"
                                >
                                    <TiDelete />
                                </button>
                                {/* Editable Contribution Block */}
                                <div className="flex flex-col space-y-4">
                                  
                                    <p
                                        className="border border-dashed w-full bg-[#f8f8f8] text-blue-light-900 p-3 border-gray-300 focus:outline-none focus:border-gray-500"
                                        contentEditable={isContributionsEnabled}
                                        suppressContentEditableWarning
                                        onBlur={(e) =>
                                            handleContributionChange(index, "message", e.currentTarget.textContent || "")
                                        }
                                        role="textbox"
                                        aria-label="Edit Contribution Message"
                                    >
                                        {contribution.message}
                                    </p>
                                    <h3
                                        className="border border-dashed w-full bg-[#f8f8f8] text-blue-light-900 p-3 border-gray-300 focus:outline-none focus:border-gray-500"
                                        contentEditable={isContributionsEnabled}
                                        suppressContentEditableWarning
                                        onBlur={(e) =>
                                            handleContributionChange(index, "name", e.currentTarget.textContent || "")
                                        }
                                        role="textbox"
                                        aria-label="Edit Contribution Name"
                                    >
                                        {contribution.name}
                                    </h3>
                                </div>
                            </div>
                            </div>
                        ))}
                    </div>
               
            )}
        </div>
    );
};

export default Contributions;
